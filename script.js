// Définition des images disponibles pour chaque roue
const roues = [
  { element: document.getElementById('roue1'), images: ['citron.png', 'moche.png', 'dolars.png', 'gun.png', 'huit.png', 'trefle.png'], dossier: 'images/roue1/' },
  { element: document.getElementById('roue2'), images: ['citron.png', 'moche.png', 'dolars.png', 'gun.png', 'huit.png', 'trefle.png'], dossier: 'images/roue1/' },
  { element: document.getElementById('roue3'), images: ['moche.png', 'citron.png', 'dolars.png', 'gun.png', 'huit.png', 'trefle.png'], dossier: 'images/roue1/' }
];
// LAMPE
const lampeImg = document.getElementById('lampe');
const imagesLampe = ['lampe.png', 'lampe2.png', 'lampe3.png'];
let lampeInterval = null;

function animerLampe() {
  if (lampeInterval) clearInterval(lampeInterval);

  lampeInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * imagesLampe.length);
    lampeImg.src = `images/lampe/${imagesLampe[randomIndex]}`;
  }, 200);
}

function arreterLampe() {
  clearInterval(lampeInterval);
  lampeImg.src = `images/lampe/${imagesLampe[0]}`; // revient à lampe.png
}

// Bouton pour lancer la machine
document.getElementById('btn-spin').onclick = () => {
  document.getElementById('resultat').textContent = '';

  let finalResult = [];

  animerLampe();

  roues.forEach((roue, index) => {
    let compteur = 0;
    let interval = setInterval(() => {
      // Choisir une image aléatoire
      const imageAleatoire = roue.images[Math.floor(Math.random() * roue.images.length)];
      roue.element.style.backgroundImage = `url(${roue.dossier}${imageAleatoire})`;
      compteur++;
    }, 100); // vitesse d'animation

    // Arrêt progressif
    setTimeout(() => {
      clearInterval(interval);
      const imageFinale = roue.images[Math.floor(Math.random() * roue.images.length)];
      roue.element.style.backgroundImage = `url(${roue.dossier}${imageFinale})`;
      finalResult[index] = imageFinale;

      // Quand toutes les roues sont arrêtées
      if (index === roues.length - 1) {
        setTimeout(() => {
          verifierResultat(finalResult);
        }, 500);

      }
    }, 2500 + index * 500); // chaque roue s'arrête un peu plus tard
  });
};

// Vérifie si le joueur gagne
function verifierResultat(resultat) {
  if (resultat[0] === resultat[1] && resultat[1] === resultat[2]) {
    document.getElementById('resultat').textContent = '🎉 JACKPOT !';
    arreterLampe();
  } else {
    document.getElementById('resultat').textContent = '😢 Perdu, réessaie !';
    arreterLampe();
  }
}
