// objet classe 
let hopital = {
    nom: "HOPITAL FANNE",
    nbET: 50,
    tabEt: []
};
// creer un Medecin objet //


// Tableau des classes 
let tabH = [];
tabH.push(hopital);

// recuperation de la div contenu par son id  ~ divContenu.innerHTML += '<h1>Hello world</h1>' + divContenu.innerHTML ;
const divContenu = document.getElementById('contenu');
const divContenuRdv = document.getElementById('contenuRdv');
const formClass = document.getElementById('formClass');
const nomCl = document.getElementById('nomH');
const nbETP = document.getElementById('nbHp');
const specialiteM = document.getElementById('specialiteM');
var classeChoissi={};

// fonction qui permet de Remplir Liste deroulante des classes
/*function remplirlisteS() {
        specialiteM.innerHTML += `<option value="Cardiologue">Cardiologue</option>`;
        specialiteM.innerHTML += `<option value="Pediatre">Pediatre</option>`;

        // Methode 2 : creation avec appendChild
        // creation d'un element html option
        // let eltOption = document.createElement("option");
        // eltOption.value = cl.code;
        // eltOption.innerText = cl.code;

        // selectCl.appendChild(eltOption);
    
}*/



/*function onChangeSpecialite() {
    let Cspecialite =specialiteM.value;
    let classe = tabClasses.find(cl => cl.code == codeClasse);
    classeChoissi=classe;
    afficherDetailCl(classe);

}

onChangeSpecialite();*/

afficherDetailHopital(hopital);
// Fonction pour afficher ou cacher un Medecin
function showMedecinForm(type) {
    if (type == "a") {
        formMedecin.removeAttribute("hidden");
    } else {
        formMedecin.setAttribute('hidden', "");
    }
}
function showSpeciaForm(type) {
    if (type == "a") {
        formSpecialisation.removeAttribute("hidden");
    } else {
        formSpecialisation.setAttribute('hidden', "");
    }
}
function showRdvForm(type) {
    if (type == "a") {
        formrdv.removeAttribute("hidden");
    } else {
        formrdv.setAttribute('hidden', "");
    }
}

function savespecialisation() {
    const regex = /^[a-zA-Z\s]+$/;
    if (specialisationMe.value=="") {
        alert("Champ Vide");
    }else if (!regex.test(specialisationMe.value)) {
        alert("La Specialite doivent contenir uniquement que des caractères alphabétiques");
    }else{

    specialiteM.innerHTML += `<option value="${specialisationMe.value}">${specialisationMe.value}</option>`;
    alert(specialisationMe.value+" "+"A ete ajouter dans les specialisation avec succes");
        }
        specialisationMe.value="";
}

//Function pour Ajouter une classe

function saveHopital() {
    let hp = {
        nom: nomH.value,
        nbM: nbMp.value,
        tabEt: []
    };
    tabH.push(hp);
    alert("L'Hopital " +nomH.value + " a été bien ajoutée !");
    nomH.value = "";
    nbMp.value = "";

}

function saveMedecin() {
    const regex = /^[a-zA-Z\s]+$/;
    if( prenomM.value[0]==" " || nomM.value=="" || specialiteM.value=="") 
        {
            alert("champ vide");
        }else if (!regex.test(prenomM.value) || !regex.test(nomM.value)) {
            alert("Le nom et le prénom doivent contenir uniquement que des caractères alphabétiques");
        }else{

    let M= {
        prenom: prenomM.value.trim(),
        nom: nomM.value.trim(),
       specialite: specialiteM.value,
       tabRdv : []
    };
       hopital.tabEt.push(M);
    alert("Le Medecin " + prenomM.value+ " a été bien ajoutée !");
}
    prenomM.value = "";
    nomM.value= "";
    specialiteM.value = "";
    afficherDetailHopital(hopital)
}


//Function pour afficher les Medecin
function afficherDetailHopital(hp) {
    divContenu.innerHTML = "";
    // créons une var tableHTML pour stocker le contenu HTML du tableau , initialiser la structure HTML .
    let tableHTML = `<div class="card border-3 border-danger mb-2">
          <div class="card-header">
              <h6>${hp.nom}</h6>
              <span>Medecins prevus : </span>
              <span class="text-primary fw-bold">${hp.nbET}</span><br>
              <span>Medecins inscrits : </span>
              <span class="text-primary fw-bold">${hp.tabEt.length}</span><br>
          </div>
          <div class="card-body">
            <div class="row float-start">
                <button class="btn btn-sm btn-danger " type="button" onclick="showSpeciaForm('a')">Configuration</button>
            </div>
            <div class="row float-end">
                <button class="btn btn-sm btn-danger " type="button" onclick="showMedecinForm('a')">Nouveau Medecin</button>
            </div>
              <h2 class="text-primary text-center">Liste des Medecins</h2>
              <table class="table table-bordered">
                  <thead>
                      <tr>
                          <th>Numero</th>
                          <th>Matricule</th>
                          <th>Prenom</th>
                          <th>Nom</th>
                          <th>Specialisation</th>  
                          <th>Action</th> 
                      </tr>
                  </thead>
                  <tbody>`;

    for (let j = 0; j < hopital.tabEt.length; j++) {
        let M = hp.tabEt[j];
        //j'en ai pas besoin pour le monment --> 
        console.log(M.matricule, M.nom, M.prenom, M.moy);

        // récupérons les infos l'étudiant et les ajoutons à la var tableHTML en tqe nouvelle ligne du tableau = a toutes les classes.
        tableHTML += `
                  <tr>
                      <td>${j + 1}</td>
                      <td>MD000${+j+1}</td>
                      <td>${M.prenom}</td>
                      <td>${M.nom}</td>
                      <td>${M.specialite}</td>
                      <td> 
                      <button class="btn btn-sm btn-danger " type="button" onclick="rdvm(${j})">Rendez-Vous</button>
                      </td>
                  </tr>`;
    }
    // </tbody></table></div></div> à la fin de la variable tableHTML
    tableHTML += `</tbody>
              </table>
          </div>
        </div>`;

    divContenu.innerHTML += tableHTML;

}

var index={}

function rdvm(position) {
    index=position;
    divContenuRdv.innerHTML = "";
    let tableHTML;
    // créons une var tableHTML pour stocker le contenu HTML du tableau , initialiser la structure HTML .
    for (let j = 0; j <hopital.tabEt.length; j++) {
        if (j==index) {  
        let M = hopital.tabEt[index];
    tableHTML = `<div class="card border-3 border-danger mb-2">
          <div class="card-header">
              <span>Medecins : </span>
              <span class="text-primary fw-bold">${M.nom} ${M.prenom}</span><br>
              <span>Specialite: </span>
              <span class="text-primary fw-bold">${M.specialite}</span><br>
          </div>
          <div class="card-body">
          <div class="row float-end">
            <button class="btn btn-sm btn-danger " type="button" onclick="showRdvForm('a')">Ajouter un Rendez-Vous</button>
          </div>
              <h2 class="text-primary text-center">Liste des Rendez</h2>
              <table class="table table-bordered">
                  <thead>
                      <tr>
                          <th>Numero</th>
                          <th>Date</th>
                          <th>Heure</th>
                          <th>Patient</th>
                          <th>Diagnostic</th>  
                      </tr>
                  </thead>
                  <tbody>`;
        }
       
            
        
    for (let i = 0; i < hopital.tabEt[j].tabRdv.length; i++) {
        if (j==index) { 
            let K=hopital.tabEt[j].tabRdv[i];
            console.log(K.date);
        tableHTML += `
        <tr>
            <td>${i+ 1}</td>
            <td>${K.date}</td>     
            <td>${K.heure}</td>
            <td>${K.nom}</td>
            <td>${K.diagnostic}</td>
        </tr>`;
        }
        
    }
}

    // </tbody></table></div></div> à la fin de la variable tableHTML
    tableHTML += `</tbody>
              </table>
          </div>
        </div>`;

    divContenuRdv.innerHTML += tableHTML;

}

// Fonction pour vérifier si un rendez-vous existe déjà à la même date et heure
function checkDuplicateRdv(medecin, date, heure) {
    for (let i = 0; i < medecin.tabRdv.length; i++) {
        if (medecin.tabRdv[i].date === date && medecin.tabRdv[i].heure === heure) {
            return true; // Rendez-vous existant trouvé
        }
    }
    return false; // Aucun rendez-vous existant trouvé
}

function saveRdv() {
    const regex = /^[a-zA-Z\s]+$/
    if( dateR.value==" " || timeR.value=="" || nomP.value=="" || diaR.value=="") 
        {
            alert("champ vide");
        }else if (!regex.test(nomP.value) || !regex.test(diaR.value)) {
            alert("Le nom du Patient et le Diagnostic doivent contenir uniquement que des caractères alphabétiques");
        }else{

    let M= {
        date: dateR.value,
        heure: timeR.value,
        nom: nomP.value.trim(),
       diagnostic: diaR.value
    };
    const Med=hopital.tabEt[index];
    const verif =checkDuplicateRdv(Med, M.date, M.heure);
    if (verif) {
        alert("Le médecin a déjà un rendez-vous à la même date et heure !");
    } else {
        hopital.tabEt[index].tabRdv.push(M);
        alert("Le Rendez-vous de " + nomP.value+ " a été bien ajoutée !");
    }
    
}
    dateR.value = "";
    timeR.value="",
    nomP.value= "";
    diaR.value = "";
    rdvm(index);
}
  

/*for (let j = 0; j < hp.tabEt.length; j++) {
    let M = hp.tabEt[j];
    //j'en ai pas besoin pour le monment --> 
    console.log(M.matricule, M.nom, M.prenom, M.moy);

    // récupérons les infos l'étudiant et les ajoutons à la var tableHTML en tqe nouvelle ligne du tableau = a toutes les classes.
    tableHTML += `
              <tr>
                  <td>${j + 1}</td>
                  <td>${M.matricule}</td>
                  <td>${M.prenom}</td>
                  <td>${M.nom}</td>
                  <td> 
                  <a href="RDV.html" class="btn btn-success"('${j}')>Rendez-Vous</a>
                  <button class="btn btn-sm btn-success" type="button" onclick="rdvM('${j}')">Rendez-Vous</button>
                  </td>
              </tr>`;
}
<button class="btn btn-sm btn-success" type="button" onclick="rdvM('${j}')">Rendez-Vous</button>
*/