document.addEventListener('DOMContentLoaded', () => {
    const fieldsConfig = [
        { id: 'nik', label: 'NIK', fullWidth: true },
        { id: 'nama', label: 'Nama Lengkap', fullWidth: true },
        { id: 'tempat_tgl_lahir', label: 'Tempat / Tgl Lahir', fullWidth: false },
        { id: 'jenis_kelamin', label: 'Jenis Kelamin', fullWidth: false },
        { id: 'gol_darah', label: 'Gol. Darah', fullWidth: false },
        { id: 'agama', label: 'Agama', fullWidth: false },
        { id: 'alamat', label: 'Alamat Lengkap', fullWidth: true },
        { id: 'status_perkawinan', label: 'Status Perkawinan', fullWidth: false },
        { id: 'pekerjaan', label: 'Pekerjaan', fullWidth: true },
        { id: 'kewarganegaraan', label: 'Kewarganegaraan', fullWidth: false },
        { id: 'berlaku_hingga', label: 'Berlaku Hingga', fullWidth: false },
    ];

    // Element References
    const formContainer = document.getElementById('formFields');
    const modelSelect = document.getElementById('modelSelect');
    const apiKeyInput = document.getElementById('apiKey');
    const btnToggleApiKey = document.getElementById('btnToggleApiKey');
    const eyeIcon = document.getElementById('eyeIcon');
    const dropZone = document.getElementById('dropZone');
    const ktpInput = document.getElementById('ktpInput');
    const previewContainer = document.getElementById('previewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const btnProcess = document.getElementById('btnProcess');
    const loading = document.getElementById('loading');
    const btnCopyAll = document.getElementById('btnCopyAll');

    let selectedBase64 = null;
    let selectedMimeType = 'image/jpeg';

    // 1. Initialize Dynamic Form Fields
    fieldsConfig.forEach(field => {
        const wrapper = document.createElement('div');
        if (field.fullWidth) wrapper.classList.add('md:col-span-2');
        wrapper.innerHTML = `
            <label class="block text-xs font-semibold text-slate-500 mb-1">${field.label}</label>
            <div class="flex gap-1.5">
                <input type="text" id="field_${field.id}" placeholder="-" 
                    class="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <button type="button" class="btn-copy-single px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition text-xs font-medium flex items-center justify-center" 
                    data-target="field_${field.id}" title="Salin">
                    <i class="fa-regular fa-copy"></i>
                </button>
            </div>
        `;
        formContainer.appendChild(wrapper);
    });

    // Delegated Event for Single Copy Buttons
    formContainer.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('.btn-copy-single');
        if (copyBtn) {
            const targetId = copyBtn.getAttribute('data-target');
            copySingleField(targetId, copyBtn);
        }
    });

    // 2. Model & API Key Management
    const savedModel = localStorage.getItem('ktp_gemini_model');
    if (savedModel) modelSelect.value = savedModel;

    modelSelect.addEventListener('change', () => {
        localStorage.setItem('ktp_gemini_model', modelSelect.value);
    });

    apiKeyInput.value = localStorage.getItem('ktp_gemini_api_key') || '';
    apiKeyInput.addEventListener('input', () => {
        localStorage.setItem('ktp_gemini_api_key', apiKeyInput.value.trim());
    });

    btnToggleApiKey.addEventListener('click', () => {
        if (apiKeyInput.type === 'password') {
            apiKeyInput.type = 'text';
            eyeIcon.className = 'fa-regular fa-eye-slash';
        } else {
            apiKeyInput.type = 'password';
            eyeIcon.className = 'fa-regular fa-eye';
        }
    });

    // 3. Drag & Drop and File Selection
    dropZone.addEventListener('click', () => ktpInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('bg-blue-100/50');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('bg-blue-100/50');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('bg-blue-100/50');
        if (e.dataTransfer.files.length) {
            ktpInput.files = e.dataTransfer.files;
            handleFileSelect();
        }
    });

    ktpInput.addEventListener('change', handleFileSelect);

    function handleFileSelect() {
        const file = ktpInput.files[0];
        if (!file) return;

        selectedMimeType = file.type || 'image/jpeg';
        const reader = new FileReader();

        reader.onload = function(e) {
            selectedBase64 = e.target.result.split(',')[1];
            imagePreview.src = e.target.result;
            previewContainer.classList.remove('hidden');
            btnProcess.disabled = false;
        };

        reader.readAsDataURL(file);
    }

    // 4. Process OCR with Gemini API
    btnProcess.addEventListener('click', processImage);

    async function processImage() {
        const apiKey = apiKeyInput.value.trim();
        const selectedModel = modelSelect.value;

        if (!apiKey) {
            alert('Silakan masukkan Gemini API Key Anda terlebih dahulu!');
            return;
        }

        if (!selectedBase64) return;

        loading.classList.remove('hidden');
        btnProcess.disabled = true;

        const promptText = `Ekstrak data KTP dari gambar ini secara presisi ke format JSON murni.

Gunakan key JSON berikut persis (semua value string):
{
  "nik": "",
  "nama": "",
  "tempat_tgl_lahir": "",
  "jenis_kelamin": "",
  "gol_darah": "",
  "agama": "",
  "alamat": "",
  "status_perkawinan": "",
  "pekerjaan": "",
  "kewarganegaraan": "",
  "berlaku_hingga": ""
}

PENTING UNTUK BIDANG "alamat": Gabungkan seluruh informasi lokasi pada KTP (Jalan/Dusun, RT/RW, Kel/Desa, dan Kecamatan) menjadi satu baris teks alamat lengkap yang utuh (contoh: "JL. SUDIRMAN NO. 12 RT 002/005 KEL. DESA MAJU KEC. PASAR MINGGU").

Jika ada bidang yang tidak jelas atau kosong, beri nilai string kosong "". Tuliskan nilai sesuai huruf kapital pada KTP.`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: promptText },
                            { inline_data: { mime_type: selectedMimeType, data: selectedBase64 } }
                        ]
                    }],
                    generationConfig: {
                        response_mime_type: "application/json"
                    }
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);

            const jsonText = data.candidates[0].content.parts[0].text;
            const resultObj = JSON.parse(jsonText);

            fieldsConfig.forEach(f => {
                const el = document.getElementById(`field_${f.id}`);
                if (el) el.value = resultObj[f.id] || '';
            });
        } catch (err) {
            alert('Gagal mengekstrak data: ' + err.message);
        } finally {
            loading.classList.add('hidden');
            btnProcess.disabled = false;
        }
    }

    // 5. Copy Functions
    function copySingleField(id, btnEl) {
        const input = document.getElementById(id);
        if (!input || !input.value) return;

        navigator.clipboard.writeText(input.value).then(() => {
            const originalHtml = btnEl.innerHTML;
            btnEl.innerHTML = '<i class="fa-solid fa-check text-green-600"></i>';
            setTimeout(() => btnEl.innerHTML = originalHtml, 1200);
        });
    }

    btnCopyAll.addEventListener('click', () => {
        let output = [];
        fieldsConfig.forEach(f => {
            const val = document.getElementById(`field_${f.id}`).value;
            output.push(`${f.label}: ${val}`);
        });

        navigator.clipboard.writeText(output.join('\n')).then(() => {
            alert('Seluruh data berhasil disalin ke clipboard!');
        });
    });
});
