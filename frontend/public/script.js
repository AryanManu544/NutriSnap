let selectedFile = null;
let isLoading = false;

const API_URL = 'http://localhost:9213/predict';

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded");
    
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadContent = document.getElementById('uploadContent');
    const predictBtn = document.getElementById('predictBtn');
    const btnText = document.getElementById('btnText');
    const results = document.getElementById('results');
    const emptyState = document.getElementById('emptyState');
    const errorMessage = document.getElementById('errorMessage');

    if (!uploadArea || !fileInput) {
        console.error("Required elements not found!");
        return;
    }

    uploadArea.addEventListener('click', function(e) {
        console.log("Upload area clicked");
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        console.log("File selected");
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    if (predictBtn) {
        predictBtn.addEventListener('click', predictFood);
    }

    function handleFile(file) {
        console.log("Processing file:", file.name);
        
        if (!file.type.startsWith('image/')) {
            showError('Please select an image file (JPG, PNG, etc.)');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            showError('File size must be less than 10MB');
            return;
        }

        selectedFile = file;
        displayImagePreview(file);
        if (predictBtn) predictBtn.disabled = false;
        clearError();
        clearResults();
    }

    function displayImagePreview(file) {
        if (!uploadContent) return;
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            uploadContent.innerHTML = `
                <img id="imagePreview" src="${e.target.result}" alt="Food Preview" style="max-width: 100%; max-height: 250px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                <div class="upload-hint">Click to change image</div>
            `;
        };
        
        reader.onerror = function() {
            showError('Error reading file. Please try again.');
        };
        
        reader.readAsDataURL(file);
    }

    async function predictFood() {
        if (!selectedFile || isLoading) return;

        setLoadingState(true);
        clearError();

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('No predictions received from server');
            }

            displayResults(data);
            
        } catch (error) {
            console.error('Prediction error:', error);
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                showError('Cannot connect to the server. Make sure the backend is running on ' + API_URL);
            } else {
                showError(`Prediction failed: ${error.message}`);
            }
        } finally {
            setLoadingState(false);
        }
    }

    function setLoadingState(loading) {
        isLoading = loading;
        
        if (btnText && predictBtn) {
            if (loading) {
                btnText.innerHTML = '<span class="loading">⏳</span> Analyzing...';
                predictBtn.disabled = true;
            } else {
                btnText.innerHTML = '🔍 Predict Food';
                predictBtn.disabled = !selectedFile;
            }
        }
    }

    function displayResults(predictions) {
        if (emptyState) emptyState.style.display = 'none';
        if (results) {
            results.classList.add('show');
            results.innerHTML = predictions.map((prediction, index) => {
                const isTop = index === 0;
                return createPredictionHTML(prediction, isTop);
            }).join('');
        }
    }

    function createPredictionHTML(prediction, isTop) {
        return `
            <div class="prediction ${isTop ? 'top' : ''}">
                <div class="prediction-header">
                    <div style="display: flex; align-items: center;">
                        <div class="rank ${isTop ? 'top' : ''}">${prediction.rank}</div>
                        <div class="food-name">${formatFoodName(prediction.food_name)}</div>
                    </div>
                    <div class="confidence ${isTop ? 'top' : ''}">${prediction.confidence}</div>
                </div>
                ${renderNutrition(prediction.nutrition)}
            </div>
        `;
    }

    function renderNutrition(nutrition) {
        if (!nutrition || typeof nutrition !== 'object') {
            return '<p style="color: #666; font-style: italic;">No nutrition data available</p>';
        }
        
        return `
            <div class="nutrition">
                ${nutrition.calories ? `
                    <div class="nutrition-item">
                        <div class="nutrition-label">Calories</div>
                        <div class="nutrition-value">${nutrition.calories}</div>
                    </div>
                ` : ''}
                ${createNutritionItem('Protein', nutrition.protein)}
                ${createNutritionItem('Carbs', nutrition.carbs)}
                ${createNutritionItem('Fat', nutrition.fat)}
                ${createNutritionItem('Fiber', nutrition.fiber)}
            </div>
        `;
    }

    function createNutritionItem(label, value) {
        if (!value) return '';
        
        return `
            <div class="nutrition-item">
                <div class="nutrition-label">${label}</div>
                <div class="nutrition-level level-${value}">${value}</div>
            </div>
        `;
    }

    function formatFoodName(name) {
        if (!name || typeof name !== 'string') return 'Unknown Food';
        
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function showError(message) {
        if (errorMessage) {
            errorMessage.innerHTML = `<div class="error">❌ ${message}</div>`;
            setTimeout(clearError, 5000);
        }
    }

    function clearError() {
        if (errorMessage) {
            errorMessage.innerHTML = '';
        }
    }

    function clearResults() {
        if (results) results.classList.remove('show');
        if (emptyState) emptyState.style.display = 'block';
    }
});