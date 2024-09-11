document.addEventListener("DOMContentLoaded", () => {
    // Code existant pour le défilement en douceur
    const menuLinks = document.querySelectorAll('.header-menu a');

    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    };

    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche le comportement par défaut du lien

            const targetSection = this.getAttribute('href'); // Obtenir l'ID de la section cible
            smoothScroll(targetSection); // Faire défiler vers la section cible
        });
    });

    // Nouveau code pour charger et afficher le fichier Excel
    const loadExcelFile = async (url) => {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            // Supposons que vous voulez afficher la première feuille de calcul
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const htmlString = XLSX.utils.sheet_to_html(worksheet);

            document.getElementById('excelData').innerHTML = htmlString;
        } catch (error) {
            console.error('Erreur lors du chargement du fichier Excel:', error);
        }
    };

    // Appeler la fonction pour charger le fichier Excel
    loadExcelFile('')
