document.addEventListener("DOMContentLoaded", async () => {
    loadmodules()
    
  })
async function loadmodules(){//Charge les modules et les affiche
    document.getElementById("title").innerHTML="Mes appareils"
    try {
        const response = await fetch("list.php");
        modules=await response.json()
    console.log(response)
    console.log(modules)
    if(response.ok){
        console.log("ok")
        document.getElementById("error").innerHTML=""//Cacher le chargement
        document.getElementById("modulecont").innerHTML=""
        if(modules.length==0){
            document.getElementById("modulecont").innerHTML+=`<div class="modulecard add minia" id="add" onclick="clickadd()">Ajouter un appareil</div>`
            return document.getElementById("error").innerHTML=`Oups, on dirait qu'il n'y a aucun appareil!`
        }
    for(const module of Object.keys(modules)){

        const moduledata = modules[module];
        if(Math.random()<0.1){
            //PANNES ALEATOIRES (commenter la ligne suivante pour désactiver les pannes aléatoires)
            //change('break',moduledata.id,true)
        }
        if(moduledata.broken==1){
            //L'appareil est cassé
            document.getElementById("modulecont").innerHTML+=`<div class="modulecard broken minia" id="modulecard ${moduledata.id}" onclick="displayspe(${moduledata.id})">⚠️ ${moduledata.nom}</div>`
        }else{
            //L'appareil marche bien
            if(moduledata.allumé==0){
                //L'appareil est éteint (Fond gris)
                document.getElementById("modulecont").innerHTML+=`<div class="modulecard off minia" id="modulecard ${moduledata.id}" onclick="displayspe(${moduledata.id})">${moduledata.nom}</div>`
            }else{
                //L'appareil est allumé (fond vert)
                document.getElementById("modulecont").innerHTML+=`<div class="modulecard on minia" id="modulecard ${moduledata.id}" onclick="displayspe(${moduledata.id})">${moduledata.nom}</div>`
            }
        }
        
    }
    //Bouton d'ajout
    document.getElementById("modulecont").innerHTML+=`<div class="modulecard add minia" id="add" onclick="clickadd()">Ajouter un appareil</div>`


}else{
        document.getElementById("error").innerHTML=`Erreur ${response.status} lors du chargement des données : ${modules.error}`
        return console.error(modules.error)
}
    } catch (error) {
        document.getElementById("error").innerHTML=`Impossible de communiquer avec le fichier list.php, c'est sûrement une erreur de serveur local : ${error}`
        return console.error(error)
    }
    
    
}
async function addmodule(){//Permet d'ajouter un module
    try {//Essayer de fetch le fichier
        const response = await fetch("add.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                "name": document.getElementById("addnom").value
            })
        });
        console.log(response)
    if (response.ok){
        await loadmodules();
    }else{
        body=await response.json()
        document.getElementById("error").innerHTML=`Erreur ${response.status} lors de l'ajout des données : ${body.error}`
        return console.error(body.error)
    }
    } catch (error) {//Impossible de communiquer avec le fichier
        document.getElementById("error").innerHTML=`Impossible de communiquer avec le fichier add.php, c'est sûrement une erreur de serveur local : ${error}`
        return console.error(error)
    }
    
    
    
}
async function displayspe(id){//Affiche un élément spécifique en plein écran
    document.getElementById("title").innerHTML="↩️ Retour"
    try {
        const response = await fetch("list.php");
        modules=await response.json()
        console.log(modules)
        if(modules.length==0){
            document.getElementById("error").innerHTML+=`Oups, on dirait que cet appareil n'est plus là! Rechargement des appareils...`
            return await loadmodules()
            }
        
        for(const module of Object.keys(modules)){
            const moduledata = modules[module];
            
            if(moduledata.id==id){
                //Affichage du bon élément
                if(moduledata.broken==1){
                    //L'appareil est cassé
                    document.getElementById("modulecont").innerHTML=`<div class="modulecard broken spe" id="modulecard ${moduledata.id}">
                    <p class="modulename">${moduledata.nom}</p>
                    <p class="status">⚠️ Appareil en panne!</p></div>`
                }else{
                    //L'appareil marche bien
                    if(moduledata.allumé==0){
                        //L'appareil est éteint (Fond gris)
                        document.getElementById("modulecont").innerHTML=`<div class="modulecard off spe" id="modulecard ${moduledata.id}">
                        <p class="modulename">${moduledata.nom}</p>
                        <p class="status" onclick="change('on')">🌙 Appareil éteint!</p>
                        </div>`
                    }else{
                        //L'appareil est allumé (fond vert)
                        date=new Date(moduledata.lastuse)
                        days=["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"]
                        document.getElementById("modulecont").innerHTML=`<div class="modulecard on spe" id="modulecard ${moduledata.id}">
                        <p class="modulename">${moduledata.nom}</p>
                        <p class="status" onclick="change('off')">🔆 Appareil allumé depuis le ${days[date.getUTCDay()-1]} ${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getFullYear()}</p>
                        </div>`
                    }
                    
                }
                //Ajout des boutons
                document.getElementById(`modulecard ${moduledata.id}`).innerHTML+=`<select name="${moduledata.id}" id="selectemu">
                    <option value="" disabled selected>Effectuer une action</option>
                    <optgroup label="Actions de l'appareil">
                        <option value="off">🌙 Eteindre l'appareil</option>
                        <option value="on">🔆 Allumer l'appareil</option>
                    </optgroup>
                    <optgroup label="Simulations de situations">
                        <option value="break">🔨 Simuler une panne</option>
                        <option value="repair">🔧 Simuler une réparation</option>
                        <option value="data">📊 Ajouter des données</option>
                    </optgroup>
                    </select>
                    <button class="delete" id="delete" onclick="deletemodule(${moduledata.id})">🗑️Supprimer le module</button>
                    <br>
                    <label for="history">Historique d'utilisation</label>
                    <br>
                    <textarea  class="history" id="history" name="history" disabled rows="4" cols="50">Chargement de l'historique (si ce message apparaît longtemps une erreur est survenue)</textarea>
                    <div id="graph">
                    <table class="charts-css column show-labels reverse-data" id="graphtable">
                    <caption> Front End Developer Salary </caption>
                    <tbody id="graphbody"></tbody>
                    </table> 
                    </div>
                    </div>`
                    //Historique
                    if(Object.keys(JSON.parse(moduledata.data)).length==0){
                        document.getElementById("history").innerHTML="On dirait qu'il n'y a aucune donnée dans l'historique!"
                    }else{

                        document.getElementById("history").innerHTML=`${Object.keys(JSON.parse(moduledata.data)).length} donnée(s) dans l'historique!\r\n`
                        highest=0
                    for(const hist of Object.keys(JSON.parse(moduledata.data))){
                        const histdata = JSON.parse(moduledata.data)[hist];
                        date = new Date(parseInt(Object.keys(histdata)[0])*1000)
                        //Ajouter dans l'historique
                        document.getElementById("history").innerHTML+=`${date.toLocaleDateString()} ${date.toLocaleTimeString()} - ${histdata[Object.keys(histdata)[0]]}\r\n`
                        //Vérifier si c'est la + grande valeur (utile pour le graph)
                        if(histdata[Object.keys(histdata)[0]]>highest){
                            highest=histdata[Object.keys(histdata)[0]]
                        }

                        
                      }
                      for (const hist of Object.keys(JSON.parse(moduledata.data))) {
                        const histdata = JSON.parse(moduledata.data)[hist];
                        //Ajouter dans le graph
                        document.getElementById("graphbody").innerHTML+=`
                        <tr>
                            <td style="--size: calc(${parseInt(histdata[Object.keys(histdata)[0]])}/${highest})" id="colonne">${parseInt(histdata[Object.keys(histdata)[0]])}</td>
                        </tr>
                        `
                      } 
                    }
                    
                document.getElementById("selectemu").addEventListener("change", async function(){
                    if(document.getElementById("selectemu").value!="placeholder"){
                        if(document.getElementById("selectemu").value=="data"){
                            data=prompt("Rentrer les données à collecter (Par exemple la température pour un thermomètre)", "123");
                            if(data==null){
                                //User cancelled
                                return await displayspe(document.getElementById("selectemu").name);
                            }else{
                                if(!isNaN(parseFloat(data))){
                                    
                                    //La donnée est valide
                                    editdata(parseFloat(data))
                                }else{
                                    return document.getElementById("error").innerHTML=`Impossible d'ajouter les données, la valeur doit être un nombre valide.`
                                    
                                }

                                
                            }
                        }
                        else{
                            change()
                        }
                        
                    }
                    
                
                })
            }
        }
    } catch (error) {
        document.getElementById("error").innerHTML+=`Impossible de communiquer avec le fichier list.php, c'est sûrement une erreur de serveur local : ${error}`
        return console.error(error)
    }
}
async function deletemodule(id){
    try {//Essayer de fetch le fichier
        const response = await fetch("delete.php", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                "id": id
            })
        });
        console.log(response)
    if (response.ok){
        await loadmodules();
    }else{
        body=await response.json()
        document.getElementById("error").innerHTML=`Erreur ${response.status} lors de l'ajout des données : ${body.error}`
    }
    } catch (error) {//Impossible de communiquer avec le fichier
        document.getElementById("error").innerHTML=`Impossible de communiquer avec le fichier add.php, c'est sûrement une erreur de serveur local : ${error}`
        return console.error(error)
    }
}
async function change(todo,id,fromminia){//Permet d'allumer, d'éteindre ou de casser et réparer un appareil (dans la variable "todo")
    if(!todo){
        todo=document.getElementById("selectemu").value
    }
    if(!id){
        id=document.getElementById("selectemu").name
    }
    try {//Essayer de fetch le fichier
        const response = await fetch("change.php", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                "id": id,
                "todo":todo
            })
        });
        console.log(response)
    if (response.ok){
        if(fromminia){
            return await loadmodules();
        }else{
            return await displayspe(id);
        }
        
    }else{
        body=await response.json()
        document.getElementById("error").innerHTML=`Erreur ${response.status} lors de l'ajout des données : ${body.error}`
        return console.error(body.error)
    }
    } catch (error) {//Impossible de communiquer avec le fichier
        document.getElementById("error").innerHTML=`Impossible de communiquer avec le fichier change.php, c'est sûrement une erreur de serveur local : ${error}`
        return console.error(error)
    }
}
async function editdata(data){//Permet de changer l'historique
    try {//Essayer de fetch le fichier
        const response = await fetch("editdata.php", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                "id": document.getElementById("selectemu").name,
                "data":data
            })
        });
        console.log(response)
    if (response.ok){
        return await displayspe(document.getElementById("selectemu").name);
    }else{
        body=await response.json()
        document.getElementById("error").innerHTML=`Erreur ${response.status} lors de l'ajout des données : ${body.error}`
        return console.error(body.error)
    }
    } catch (error) {//Impossible de communiquer avec le fichier
        document.getElementById("error").innerHTML=`Impossible de communiquer avec le fichier editdata.php, c'est sûrement une erreur de serveur local : ${error}`
        return console.error(error)
    }
}
function clickadd(){//Quand on clique sur le bouton pour ajouter un appareil, et que la barre apparaît
    if(document.getElementById("add").innerHTML=="Ajouter un appareil"){
        document.getElementById("add").innerHTML=`
    <input type="text" placeholder="Nom de l'appareil" name="addnom" id="addnom"><br>
    <button onclick="addmodule()">Ajouter!</button>
    `
    }
}