const dotenv = require('dotenv');
dotenv.config();

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_API_URL = process.env.MAILGUN_API_URL;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const MAILGUN_SENDER_EMAIL = process.env.MAILGUN_SENDER_EMAIL;
const MAILGUN_USERNAME = process.env.MAILGUN_USERNAME;

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);



const client = mailgun.client({
    username: MAILGUN_USERNAME,
    key: MAILGUN_API_KEY,
    url: MAILGUN_API_URL
})

class MailService{

    //Sending a mail from the contact form on client side
    async sendContactMail(civility, firstname, lastname, email, phone, preference, subject, text){

        let sendingMailEstate ;

        let finalSubject = "Contact | " + subject ;

        let preferences = "NB: je souhaite être recontacté par " + preference

        let messageBody = text + "\n\n" + preferences+ "\n\n" + civility + " " + firstname + " " + lastname +"\n" +email +"\n" + phone;
   
        const mailData = {
            from: MAILGUN_SENDER_EMAIL,
            to: 'manduel21@gmail.com',
            subject: finalSubject,
            text: messageBody
        };

        await client.messages.create(MAILGUN_DOMAIN, mailData)
        .then( res =>{
            sendingMailEstate = true;
        })
        .catch((err)=>{
            sendingMailEstate = false;
        })

        return sendingMailEstate;
    }

    //Sending a mail from the flight form on client side
    async sendFlightMail(way, cabine, departure, arrival, dateDep, dateRet, adult, child, infant, lastname, email, phone, message){

        let sendingMailEstate ;

        let finalSubject = "Vols | Billet d'avion";        
        
        let personalData = lastname +"\n" + email +"\n" + phone;        

        let recap = "Pouvez-vous m'indiquer les prix et différentes possibilités pour mon voyage?"
                +"\n\n"+"Information de réservation" 
                + "\n\n" +"Trajet : "+way
                + "\n" + "Cabine : " + cabine
                + "\n" +"Départ : " + departure
                + "\n" +"Arrivée : " + arrival 
                + "\n" +"Date départ : " + dateDep.split('T')[0]
                +((dateRet.length > 0)?("\nDate retour : " +dateRet.split('T')[0]) : "")
                +((adult.toString().length > 0)?("\nPassager adulte : " + adult) : "")
                +((child.toString().length > 0)?("\nPassager enfant : " + child): "")
                +((infant.toString().length > 0)?("\nPassager bébé : " + infant) : "")

                let messageBody = ((message.length>0)?(message):"Bonjour") + "\n\n" + recap + "\n\n" + personalData;

        const mailData = {
            from: MAILGUN_SENDER_EMAIL,
            to: 'manduel21@gmail.com',
            subject: finalSubject,
            text: messageBody
        };

        await client.messages.create(MAILGUN_DOMAIN, mailData)
        .then( res =>{
            sendingMailEstate = true;
        })
        .catch((err)=>{
            sendingMailEstate = false;
        })

        return sendingMailEstate;
    }

    //Sending a mail from the dhl form on client side
    async sendDhlMail(civility, firstname, lastname, email, phone, country, weight, contains, dimensions) { 
    
        let sendingMailEstate ;

        let finalSubject = "DHL | Dévis expédition colis" ;
        
        let personalData = civility + " " + firstname+" "+lastname +"\n"+email+"\n"+phone;
        
        let info = "Bonjour,\n\nJ'aimerais simuler une expédition DHL pour avoir un apperçu du prix."+ "\n\n"+
                    "Informations d'expédition" + "\n\n" + 
                    "Départ : Cameroun" + "\n" +
                    "Destination : "+country + "\n" + 
                    "Poids : " + weight + "\n" +
                    "Contenu : " + contains + "\n" +
                    "Dimensions du colis : " + dimensions ;

        let messageBody = info + "\n" + personalData;

        const mailData = {
            from: MAILGUN_SENDER_EMAIL,
            to: 'manduel21@gmail.com',
            subject: finalSubject,
            text: messageBody
        };

        await client.messages.create(MAILGUN_DOMAIN, mailData)
        .then( res =>{
            sendingMailEstate = true;
        })
        .catch((err)=>{
            sendingMailEstate = false;
        })

        return sendingMailEstate;

    }
    
    //Sending a mail from the car form on client side
    async sendCarMail(reason, town, capacity, driver, dateDeb, dateFin, heureDeb, heureFin, extras, civility, firstname, lastname, email, phone) { 
    
        let sendingMailEstate ;

        let finalSubject = "Voiture | Location de voiture" ;
        
        let personalData = civility + " " + firstname + " " + lastname +"\n" +email +"\n" + phone ;
        
        let extrasList = [];

        if(extras.length > 0){
            extras.forEach((element) => {
                extrasList.push(element+" ")
            });
        }

        let info = "Bonjour,\n\nJ'aimerais louer un véhicule \n\n"
                    +"Information de location \n\n"
                    + "Motif de location : " +reason + "\n" 
                    + "Ville : " + town + "\n"
                    + "Nombre de places : " + capacity + "\n"
                    + "Location : " + driver + "\n"
                    + "Date début : " + dateDeb.split('T')[0] + ((heureDeb.length>0)? " à "+heureDeb: "")  + "\n"
                    + "Date fin : " + dateFin.split('T')[0] + ((heureFin.length>0)? " à "+heureFin: "") + "\n"
                    + ((extras.length > 0)?"Extras : " + extrasList : "")

        let messageBody = info + "\n\n" + personalData;

        const mailData = {
            from: MAILGUN_SENDER_EMAIL,
            to: 'manduel21@gmail.com',
            subject: finalSubject,
            text: messageBody
        };

        await client.messages.create(MAILGUN_DOMAIN, mailData)
        .then( res =>{
            sendingMailEstate = true;
        })
        .catch((err)=>{
            sendingMailEstate = false;
        })

        return sendingMailEstate;

    }
    
    //Sending a mail from the Apartment form on client side
    async sendApartMail(type, town, dateDeb, dateFin, extras, civility, firstname, lastname, email, phone){

        let sendingMailEstate ;

        let personalData = civility + " " + firstname + " " + lastname +"\n" +email +"\n" + phone ;
        
        let finalSubject = "Appartement | Location appartement meublé" ;

        let extrasList = [];

        if(extras.length > 0){
            extras.forEach(element => {
                extrasList.push(element+" ")
            });
        }

        let info = "Bonjour,\n\nJ'aimerais louer un appartement \n\n"
                    +"Information de location \n\n"
                    + "Type d'appartement : " +type + "\n" 
                    + "Ville : " + town + "\n"
                    + "Date début : " + dateDeb.split('T')[0] +"\n"
                    + "Date fin : " + dateFin.split('T')[0] +"\n"
                    + ((extras.length > 0)?"Extras : " + extrasList : "")

        let messageBody = info + "\n\n" + personalData;

        const mailData = {
            from: MAILGUN_SENDER_EMAIL,
            to: 'manduel21@gmail.com',
            subject: finalSubject,
            text: messageBody
        };

        await client.messages.create(MAILGUN_DOMAIN, mailData)
        .then( res =>{
            sendingMailEstate = true;
        })
        .catch((err)=>{
            sendingMailEstate = false;
        })

        return sendingMailEstate;
    }

    //Sending a mail from the hostel form on client side
    async sendHostelMail(nbr, town, dateDeb, dateFin, extras, civility, firstname, lastname, email, phone, hotels){

        let sendingMailEstate ;

        let personalData = civility + " " + firstname + " " + lastname +"\n" +email +"\n" + phone ;
        let finalSubject = "HÖTEL | Hébergement hôtel" ;

        let extrasList = [];

        if(extras.length > 0){
            extras.forEach(element => {
                extrasList.push(element+" ")
            });
        }

        let info = "Bonjour,\n\nJ'aimerais effectuer une réservation d'hôtel \n\n"
            +"Informations de réservation \n\n"
            + "Nombre de chambre(s) : " +nbr + "\n" 
            + "Ville : " + town + "\n"
            + "Date début : " + dateDeb.split('T')[0] +"\n"
            + "Date fin : " + dateFin.split('T')[0] +"\n"
            + ((extras.length > 0)?"Extras : " + extrasList+"\n" : "")
            + (hotels.length>0)?("Regardez en priorité: "+hotels):""
        
        let messageBody = info + "\n\n" + personalData;

        const mailData = {
            from: MAILGUN_SENDER_EMAIL,
            to: 'manduel21@gmail.com',
            subject: finalSubject,
            text: messageBody
        };

        await client.messages.create(MAILGUN_DOMAIN, mailData)
        .then( res =>{
            sendingMailEstate = true;
        })
        .catch((err)=>{
            sendingMailEstate = false;
        })

        return sendingMailEstate;
    }

    async sendCarParisMail(departure, arrival, date, hour, civility, firstname, lastname, email){

        let sendingMailEstate ;

        let personalData = civility + " " + firstname + " " + lastname +"\n" +email ;

        let finalSubject = "CAR-PARIS | Location VTC Paris" ;

        let info = "Bonjour,\n\nInformations de réservation \n\n"
            + "Adresse de départ " + departure + "\n" 
            + "Adresse d'arrivée " + arrival + "\n"
            + "Date : " + date.split('T')[0] + "\n"
            + "Heure : " + hour.split('T')[1] ;



        let messageBody = info + "\n" + personalData;

        console.log(messageBody);
        
        const mailData = {
            from: MAILGUN_SENDER_EMAIL,
            to: 'manduel21@gmail.com',
            subject: finalSubject,
            text: messageBody
        };

        await client.messages.create(MAILGUN_DOMAIN, mailData)
        .then( res =>{
            sendingMailEstate = true;
        })
        .catch((err)=>{
            sendingMailEstate = false;
        })

        return sendingMailEstate;

    }

    async sendTourMail(circuit,date,logement,civility,lastname,firstname,email,nombrePassagerAdult,nombrePassagerEnfant,nombrePassagerBebe){

        let sendingMailEstate ;

        let personalData = civility + " " + firstname + " " + lastname +"\n" +email ;
        
        let finalSubject = "Tourisme | Demande de réservation" ;

        let info = "Informations de réservation : \n\n"
            + "Date : " + date.split('T')[0] + "\n"
            + "Logement : " +logement+ "\n"
            + "Nombre de personnes total : " + ( nombrePassagerAdult +  nombrePassagerEnfant + nombrePassagerBebe) + "\n"
            + "--->Adulte(s) : " + nombrePassagerAdult + "\n"
            + "--->Enfant(s) : " +nombrePassagerEnfant + "\n"
            + "--->Bébés(s) : " +nombrePassagerBebe

        let messageBody = "Bonjour,\nJe souhaite faire une réservation pour le circuit touristique intitulé : " + circuit+
                        "\n\n" +info + 
                        "\n\n" + personalData;
    
    
            const mailData = {
                from: MAILGUN_SENDER_EMAIL,
                to: 'manduel21@gmail.com',
                subject: finalSubject,
                text: messageBody
            };
    
            await client.messages.create(MAILGUN_DOMAIN, mailData)
            .then( res =>{
                sendingMailEstate = true;
            })
            .catch((err)=>{
                sendingMailEstate = false;
            })

            return sendingMailEstate;
 
    }

    async addToNewsletter(email){

        let sendingMailEstate ;

        let finalSubject = "Newsletter | Ajout à la newsletter" ;

        let messageBody = "Bonjour,"
                            +"\nMerci de m'ajouter à votre newsletter pour pouvoir profiter de vos promotions et vos nouvelles offres. "
                            +"\n\n Mon adresse mail: "+ email
                            +"\n\n Bonne journée à vous."
    
            const mailData = {
                from: MAILGUN_SENDER_EMAIL,
                to: 'manduel21@gmail.com',
                subject: finalSubject,
                text: messageBody
            };


           await client.messages.create(MAILGUN_DOMAIN, mailData)
            .then( res =>{
                sendingMailEstate = true;
            })
            .catch((err)=>{
                sendingMailEstate = false;
            })

            return sendingMailEstate;
    }

}

module.exports = MailService ;