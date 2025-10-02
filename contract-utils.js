// وظائف العقد - تحويل إلى Word وطباعة
class ContractUtils {
    constructor() {
        this.init();
    }

    init() {
        // إضافة أزرار التحكم
        this.addControlButtons();
        // تحسين الطباعة
        this.setupPrintStyles();
    }

    addControlButtons() {
        const controlsHTML = `
            <div id="contract-controls" style="
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 1000;
                background: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 5px 25px rgba(0,0,0,0.15);
                border: 1px solid #dee2e6;
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            ">
                <button onclick="contractUtils.printContract()" style="
                    background: #2c5aa0;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: 'Cairo', sans-serif;
                    font-weight: 600;
                ">
                    🖨️ طباعة العقد
                </button>
                
                <button onclick="contractUtils.downloadAsWord()" style="
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: 'Cairo', sans-serif;
                    font-weight: 600;
                ">
                    📄 تحميل Word
                </button>
                
                <button onclick="window.open('عقد_العمل_PDF_محسن.html', '_blank')" style="
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: 'Cairo', sans-serif;
                    font-weight: 600;
                ">
                    📑 تحميل PDF
                </button>
                
                <button onclick="contractUtils.hideControls()" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: 'Cairo', sans-serif;
                ">
                    ✕
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', controlsHTML);
    }

    hideControls() {
        const controls = document.getElementById('contract-controls');
        if (controls) {
            controls.style.display = 'none';
        }
    }

    showControls() {
        const controls = document.getElementById('contract-controls');
        if (controls) {
            controls.style.display = 'flex';
        }
    }

    printContract() {
        // إخفاء أزرار التحكم قبل الطباعة
        this.hideControls();
        
        // إضافة ستايل خاص بالطباعة
        const printStyle = document.createElement('style');
        printStyle.innerHTML = `
            @media print {
                body {
                    margin: 0 !important;
                    padding: 15mm !important;
                    font-size: 11pt !important;
                    line-height: 1.6 !important;
                }
                
                .section {
                    page-break-inside: avoid;
                    margin-bottom: 20px !important;
                }
                
                .signature-section {
                    page-break-before: auto;
                    margin-top: 30px !important;
                }
                
                .services-table {
                    font-size: 10pt !important;
                }
                
                .services-table th,
                .services-table td {
                    padding: 8px !important;
                }
                
                #contract-controls {
                    display: none !important;
                }
            }
        `;
        
        document.head.appendChild(printStyle);
        
        // طباعة
        window.print();
        
        // إزالة الستايل وإظهار الأزرار بعد الطباعة
        setTimeout(() => {
            document.head.removeChild(printStyle);
            this.showControls();
        }, 1000);
    }

    downloadAsWord() {
        // إخفاء أزرار التحكم
        this.hideControls();
        
        // الحصول على محتوى العقد
        const contractContent = document.documentElement.outerHTML;
        
        // إنشاء محتوى Word
        const wordContent = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' 
                  xmlns:w='urn:schemas-microsoft-com:office:word' 
                  xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>عقد تطوير الحلول الرقمية - مركز الهمم</title>
                <!--[if gte mso 9]>
                <xml>
                    <w:WordDocument>
                        <w:View>Print</w:View>
                        <w:Zoom>90</w:Zoom>
                        <w:DoNotPromptForConvert/>
                        <w:DoNotShowInsertionsAndDeletions/>
                    </w:WordDocument>
                </xml>
                <![endif]-->
                <style>
                    @page {
                        size: A4;
                        margin: 2cm;
                    }
                    
                    body {
                        font-family: 'Arial Unicode MS', 'Tahoma', 'Times New Roman', 'Arial', sans-serif;
                        font-size: 12pt;
                        line-height: 1.6;
                        direction: rtl;
                        text-align: right;
                        unicode-bidi: embed;
                    }
                    
                    .header h1 {
                        font-size: 18pt;
                        font-weight: bold;
                        text-align: center;
                        color: #2c5aa0;
                    }
                    
                    .section-title {
                        font-size: 14pt;
                        font-weight: bold;
                        color: #2c5aa0;
                        border-right: 3pt solid #2c5aa0;
                        padding-right: 10pt;
                        margin-top: 20pt;
                        margin-bottom: 10pt;
                    }
                    
                    .services-table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 10pt 0;
                    }
                    
                    .services-table th,
                    .services-table td {
                        border: 1pt solid #000;
                        padding: 8pt;
                        text-align: right;
                    }
                    
                    .services-table th {
                        background-color: #2c5aa0;
                        color: white;
                        font-weight: bold;
                    }
                    
                    .signature-section {
                        margin-top: 40pt;
                    }
                    
                    .signature-box {
                        border: 2pt solid #2c5aa0;
                        padding: 20pt;
                        margin: 10pt;
                        text-align: center;
                    }
                    
                    #contract-controls {
                        display: none;
                    }
                </style>
            </head>
            ${contractContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')}
            </html>
        `;
        
        // إنشاء Blob وتحميل الملف
        const blob = new Blob([wordContent], {
            type: 'application/msword;charset=utf-8'
        });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'عقد_تطوير_الحلول_الرقمية_مركز_الهمم.doc';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // إظهار الأزرار مرة أخرى
        setTimeout(() => {
            this.showControls();
        }, 500);
        
        // إظهار رسالة نجاح
        this.showSuccessMessage('تم تحميل ملف Word بنجاح! 📄');
    }

    downloadAsPDF() {
        // إخفاء أزرار التحكم
        this.hideControls();
        
        // استخدام window.print مع تحسينات PDF
        const printStyle = document.createElement('style');
        printStyle.innerHTML = `
            @media print {
                @page {
                    size: A4;
                    margin: 15mm;
                }
                
                body {
                    font-size: 11pt;
                    line-height: 1.5;
                }
                
                .section {
                    page-break-inside: avoid;
                }
                
                .signature-section {
                    page-break-before: auto;
                }
                
                #contract-controls {
                    display: none !important;
                }
            }
        `;
        
        document.head.appendChild(printStyle);
        
        // فتح نافذة الطباعة (يمكن للمستخدم اختيار حفظ كـ PDF)
        window.print();
        
        setTimeout(() => {
            document.head.removeChild(printStyle);
            this.showControls();
        }, 1000);
        
        this.showSuccessMessage('استخدم خيار "حفظ كـ PDF" من نافذة الطباعة 📑');
    }

    showSuccessMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #28a745;
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            font-family: 'Cairo', sans-serif;
            font-weight: 600;
            font-size: 16px;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
            direction: rtl;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }

    setupPrintStyles() {
        // إضافة ستايلات محسنة للطباعة
        const printStyles = document.createElement('style');
        printStyles.innerHTML = `
            @media print {
                * {
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
                
                body {
                    margin: 0;
                    padding: 15mm;
                    font-size: 11pt;
                    line-height: 1.5;
                }
                
                .header {
                    border-bottom: 2pt solid #2c5aa0 !important;
                }
                
                .section-title {
                    color: #2c5aa0 !important;
                    border-right: 3pt solid #2c5aa0 !important;
                }
                
                .services-table th {
                    background: #2c5aa0 !important;
                    color: white !important;
                }
                
                .price-highlight {
                    background: #28a745 !important;
                    color: white !important;
                }
                
                .signature-box {
                    border: 2pt solid #2c5aa0 !important;
                }
                
                #contract-controls {
                    display: none !important;
                }
            }
        `;
        
        document.head.appendChild(printStyles);
    }
}

// تهيئة الكلاس عند تحميل الصفحة
let contractUtils;
document.addEventListener('DOMContentLoaded', function() {
    contractUtils = new ContractUtils();
});

// إضافة وظائف إضافية للتحكم
window.addEventListener('beforeprint', function() {
    if (contractUtils) {
        contractUtils.hideControls();
    }
});

window.addEventListener('afterprint', function() {
    if (contractUtils) {
        setTimeout(() => {
            contractUtils.showControls();
        }, 500);
    }
});
