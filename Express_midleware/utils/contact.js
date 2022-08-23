const fs = require("fs")
const validator = require("validator")
//cek folder
if(!fs.existsSync("./data")){
    fs.mkdirSync("data")
}

//cek file
if(!fs.existsSync("./data/database.json")){
    fs.writeFileSync("./data/database.json", "[]", "utf-8")
}

//get database
const getDatabase = ()=>{
    let database = fs.readFileSync("./data/database.json", "utf-8")
    let arr = JSON.parse(database)
    return arr
}
//fungsi tambah akun
const inputData = (nama, email, noHp)=>{
        const dataBuffer ={nama, email, noHp}
        // let database = fs.readFileSync("./data/database.json", "utf-8")
        // let arr = JSON.parse(database)
        const arr = getDatabase()
        
        //validasi nama
        let dupliat = arr.find((arr)=> arr.nama === nama)
        if(dupliat){
            console.log("nama sudah ada")
            return false
        }
        //validasi email
        if(email){
            let isEmail = validator.isEmail(email)
            if(!isEmail){
                console.log("maaf itu bukan email")
                return false
        }
        }
        //validasi noHp
        let isNoHp = validator.isMobilePhone(noHp, "id-ID")
        if(!isNoHp){
            console.log("maaf itu buka nomor hp indonesia")
            return false
        }
        arr.push(dataBuffer)
        let akunJson = JSON.stringify(arr)
        fs.writeFileSync("./data/database.json", akunJson)
        console.log("terima kasih sudah mengisi")
}
//fungsi hapus akun
const removeAcc = (akun)=>{
    const contacts = getDatabase()
    //cek akun
    const cekAcc = contacts.find((element)=>element.name == akun)
    if(!cekAcc){
        console.log(
`maaf akun bernama:${akun} tidak ada!,
mohon tambahkan dulu menggunakan add -params !!`
)
        return false
    }
    contacts.forEach((element, index) => {
        if(contacts[index].nama === akun){
            contacts.splice(index, 1)
        }
    });
    const contactsJson = JSON.stringify(contacts)
    fs.writeFileSync("./data/database.json",contactsJson)
    console.log(`akun ${akun} telah dihapus`)
}
//fungsi menampilkan list
const seeList = ()=>{
    const contacts = getDatabase()
    //cek contact
    if(contacts.length === 0){
        console.log(`tidak ada akun,mohon untuk membuat terlebih dahulu!!`)
        return false
    }
    //tampilin list
    contacts.forEach((element,index)=>{
        console.log(`No.${index++} nama:${element.nama} noHp:${element.noHp}`)
    })
}
//fungsi detail 
const detail = (akun)=>{
    const contacts = getDatabase()
    //tampilin detail
    let dupliat = contacts.find((contact)=> contact.nama === akun)
        if(dupliat){
            return dupliat
        }
}
module.exports = {getDatabase, detail}