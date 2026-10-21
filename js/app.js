document.addEventListener('DOMContentLoaded', () => {
    const MAX_FILES = 5;

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
    const previewGrid = document.getElementById('previewGrid');
    const fileCountBadge = document.getElementById('fileCountBadge');
    const btnProcess = document.getElementById('btnProcess');
    const btnProcessText = document.getElementById('btnProcessText');
    const loading = document.getElementById('loading');
    const loadingText = document.getElementById('loadingText');
    const emptyState = document.getElementById('emptyState');
    const resultTabs = document.getElementById('resultTabs');
    const btnCopyCurrent = document.getElementById('btnCopyCurrent');
    const btnCopyAll = document.getElementById('btnCopyAll');

    let selectedFiles = []; 
    let processedResults = []; 
    let activeTabIndex = 0;

    // 1. Initialize Dynamic Form Fields
    fieldsConfig.forEach(field => {
        const wrapper = document.createElement('div');
        // Pastikan class kolom tersetting dengan benar (agar rapih saat desktop & mobile)
        wrapper.className = field.fullWidth ? 'col-span-1 md:col-span-2' : 'col-span-1';
        
        wrapper.innerHTML = `
            <label class="block text-xs font-bold text-slate-500 mb-1.5 ml-1">${field.label}</label>
            <div class="flex gap-2">
                <input type="text" id="field_${field.id}" placeholder="-" 
                    class="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg bg-slate-50 font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-sm">
                <button type="button" class="btn-copy-single px-4 bg-white hover:bg-slate-50 text-slate-600 rounded-lg border border-slate-200 transition-all shadow-sm text-sm font-medium flex items-center justify-center group" 
                    data-target="field_${field.id}" title="Salin">
                    <i class="fa-regular fa-copy group-hover:text-blue-600 transition-colors"></i>
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
            handleFilesSelect(e.dataTransfer.files);
        }
    });

    ktpInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFilesSelect(e.target.files);
        }
    });

    function handleFilesSelect(filesList) {
        const incomingFiles = Array.from(filesList);
        
        if (selectedFiles.length + incomingFiles.length > MAX_FILES) {
            alert(`Maksimal hanya dapat mengunggah ${MAX_FILES} foto KTP sekaligus!`);
        }

        const availableSlots = MAX_FILES - selectedFiles.length;
        const filesToAdd = incomingFiles.slice(0, availableSlots);

        filesToAdd.forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                selectedFiles.push({
                    file: file,
                    mimeType: file.type || 'image/jpeg',
                    base64: e.target.result.split(',')[1],
                    previewUrl: e.target.result
                });
                renderPreviews();
            };
            reader.readAsDataURL(file);
        });

        ktpInput.value = '';
    }

    function renderPreviews() {
        previewGrid.innerHTML = '';

        if (selectedFiles.length === 0) {
            previewContainer.classList.add('hidden');
            fileCountBadge.classList.add('hidden');
            btnProcess.disabled = true;
            btnProcessText.textContent = 'Ekstrak Data KTP';
            return;
        }

        previewContainer.classList.remove('hidden');
        fileCountBadge.classList.remove('hidden');
        fileCountBadge.textContent = `${selectedFiles.length} / ${MAX_FILES}`;
        btnProcess.disabled = false;
        btnProcessText.textContent = `Ekstrak ${selectedFiles.length} Data KTP`;

        selectedFiles.forEach((item, index) => {
            const thumbDiv = document.createElement('div');
            thumbDiv.className = 'relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-900 aspect-video flex items-center justify-center';
            thumbDiv.innerHTML = `
                <img src="${item.previewUrl}" class="w-full h-full object-cover">
                <button type="button" class="btn-remove-file absolute top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition" data-index="${index}" title="Hapus">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;
            previewGrid.appendChild(thumbDiv);
        });
    }

    previewGrid.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.btn-remove-file');
        if (removeBtn) {
            const index = parseInt(removeBtn.getAttribute('data-index'));
            selectedFiles.splice(index, 1);
            renderPreviews();
        }
    });

    // 4. Process OCR with Gemini API
    btnProcess.addEventListener('click', processImages);

    async function processImages() {
        const apiKey = apiKeyInput.value.trim();
        const selectedModel = modelSelect.value;

        if (!apiKey) {
            alert('Silakan masukkan Gemini API Key Anda terlebih dahulu!');
            return;
        }

        if (selectedFiles.length === 0) return;

        loading.classList.remove('hidden');
        emptyState.classList.add('hidden');
        formContainer.classList.add('hidden');
        resultTabs.classList.add('hidden');
        btnCopyCurrent.classList.add('hidden');
        btnCopyAll.classList.add('hidden');
        btnProcess.disabled = true;

        processedResults = [];

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

        for (let i = 0; i < selectedFiles.length; i++) {
            loadingText.textContent = `Menganalisis foto KTP ${i + 1} dari ${selectedFiles.length}...`;

            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: promptText },
                                { inline_data: { mime_type: selectedFiles[i].mimeType, data: selectedFiles[i].base64 } }
                            ]
                        }],
                        generationConfig: { response_mime_type: "application/json" }
                    })
                });

                const data = await response.json();
                if (data.error) throw new Error(data.error.message);

                const jsonText = data.candidates[0].content.parts[0].text;
                const resultObj = JSON.parse(jsonText);
                processedResults.push({ success: true, data: resultObj });
            } catch (err) {
                processedResults.push({ success: false, error: err.message });
            }
        }

        loading.classList.add('hidden');
        btnProcess.disabled = false;

        renderResultsUI();
    }

    // 5. Render Results and Tabs
    function renderResultsUI() {
        if (processedResults.length === 0) return;

        resultTabs.innerHTML = '';
        resultTabs.classList.remove('hidden');
        formContainer.classList.remove('hidden');
        btnCopyCurrent.classList.remove('hidden');
        btnCopyAll.classList.remove('hidden');

        processedResults.forEach((res, idx) => {
            const tabBtn = document.createElement('button');
            tabBtn.type = 'button';
            tabBtn.className = `px-3 py-1.5 rounded-lg text-xs font-semibold border transition border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200`;
            tabBtn.innerHTML = res.success 
                ? `<i class="fa-solid fa-id-card"></i> KTP #${idx + 1}` 
                : `<i class="fa-solid fa-triangle-exclamation text-red-500"></i> KTP #${idx + 1}`;
            tabBtn.setAttribute('data-tab', idx);
            resultTabs.appendChild(tabBtn);
        });

        resultTabs.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabIdx = parseInt(e.currentTarget.getAttribute('data-tab'));
                switchTab(tabIdx);
            });
        });

        switchTab(0);
    }

    function switchTab(index) {
        activeTabIndex = index;

        const tabs = resultTabs.querySelectorAll('button');
        tabs.forEach((tab, idx) => {
            if (idx === index) {
                tab.classList.add('tab-active');
            } else {
                tab.classList.remove('tab-active');
            }
        });

        const currentRes = processedResults[index];
        if (currentRes && currentRes.success) {
            fieldsConfig.forEach(f => {
                const el = document.getElementById(`field_${f.id}`);
                if (el) el.value = currentRes.data[f.id] || '';
            });
        } else {
            fieldsConfig.forEach(f => {
                const el = document.getElementById(`field_${f.id}`);
                if (el) el.value = `[Error: ${currentRes.error}]`;
            });
        }
    }

    // 6. Copy Functions
    function copySingleField(id, btnEl) {
        const input = document.getElementById(id);
        if (!input || !input.value) return;

        navigator.clipboard.writeText(input.value).then(() => {
            const originalHtml = btnEl.innerHTML;
            btnEl.innerHTML = '<i class="fa-solid fa-check text-green-600"></i>';
            setTimeout(() => btnEl.innerHTML = originalHtml, 1200);
        });
    }

    btnCopyCurrent.addEventListener('click', () => {
        let output = [`=== KTP #${activeTabIndex + 1} ===`];
        fieldsConfig.forEach(f => {
            const val = document.getElementById(`field_${f.id}`).value;
            output.push(`${f.label}: ${val}`);
        });

        navigator.clipboard.writeText(output.join('\n')).then(() => {
            alert(`Data KTP #${activeTabIndex + 1} berhasil disalin!`);
        });
    });

    btnCopyAll.addEventListener('click', () => {
        let allOutput = [];

        processedResults.forEach((res, idx) => {
            allOutput.push(`=== KTP #${idx + 1} ===`);
            if (res.success) {
                fieldsConfig.forEach(f => {
                    allOutput.push(`${f.label}: ${res.data[f.id] || ''}`);
                });
            } else {
                allOutput.push(`Error: ${res.error}`);
            }
            allOutput.push('');
        });

        navigator.clipboard.writeText(allOutput.join('\n')).then(() => {
            alert('Seluruh data KTP berhasil disalin ke clipboard!');
        });
    });
});
