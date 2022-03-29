const multer = require('multer');
const path = require('path');
var pasta = "/docs"
export default  {
    fileFilter: (req: any, file: any, cb: any) => {        
        if (req.query.tipo == "imagem" && (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")) {
            cb(null, true);
        } else if (req.query.tipo == "audio" && (file.mimetype == "audio/mp3" || file.mimetype == "audio/wma" || file.mimetype == "audio/aac")) {
            cb(null, true);
        }else if (req.query.tipo == "video" && (file.mimetype == "audio/mp4" || file.mimetype == "audio/wmv" || file.mimetype == "audio/avi")) {
            cb(null, true);
        }else if (req.query.tipo == "texto" && (file.mimetype == "audio/txt" || file.mimetype == "audio/docx" || file.mimetype == "audio/doc" || file.mimetype == "audio/pptx" || file.mimetype == "audio/psd" || file.mimetype == "audio/csv" || file.mimetype == "audio/xls " || file.mimetype == "audio/xlsx")) {
            cb(null, true);
        }else{
            cb(null, false);
            return cb(new Error(`Apenas formatos de ${req.query.tipo} são aceitos`));
        }
    },
    storage: multer.diskStorage({
        // destination: (req: any) => {
        //     var destination = path.resolve(__dirname,'..','..',`static/uploads/${req.query.pasta}`)
        //     console.log(destination)
        //     return destination
        // },
        destination: path.resolve(__dirname,'..','..',`static/uploads/${pasta}`),
        filename: (req: any, file: any, cb: any) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname,ext);

            if(req.query.nome){
                var fileName = `${req.query.nome}${ext}`;
            }else{
                var fileName = `${Date.now()}${ext}`;
            }
            
            file.originalname = fileName;

            cb(null,fileName)
        }
    })
};