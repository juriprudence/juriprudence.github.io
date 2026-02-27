document.addEventListener('DOMContentLoaded', function () {
    const footerTemplate = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h5>حول المنصة</h5>
                    <p class="text-white-50 small">بوابتكم للاجتهاد القضائي الحديث، نستخدم تقنيات الذكاء الاصطناعي لتسهيل الوصول إلى قرارات المحكمة العليا بدقة وكفاءة.</p>
                </div>
                <div class="footer-section">
                    <h5>روابط سريعة</h5>
                    <ul class="footer-links">
                        <li><a href="./index.html">الرئيسية</a></li>
                        <li><a href="./about.html">عن الموقع</a></li>
                        <li><a href="./article.html">مقالات قانونية</a></li>
                        <li><a href="./contact.html">اتصل بنا</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h5>القانون والخصوصية</h5>
                    <ul class="footer-links">
                        <li><a href="./privacy.html">سياسة الخصوصية</a></li>
                        <li><a href="./terms.html">شروط الخدمة</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h5>تواصل معنا</h5>
                    <p class="text-white-50 small">البريد الإلكتروني: ramedde40071@gmail.com</p>
                    <div class="mt-3">
                        <a href="https://web.facebook.com/Juriprudencedz-109095147642615" class="btn btn-outline-light btn-sm">فيسبوك</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="mb-0 small">جميع الحقوق محفوظة &copy; 2026 <a href="./index.html">juriprudence.github.io</a></p>
            </div>
        </div>
    `;

    const footerElement = document.getElementById('global-footer') || document.querySelector('footer');
    if (footerElement) {
        footerElement.innerHTML = footerTemplate;
        footerElement.classList.add('footer'); // Ensure it has the class for styling
    }
});
