import { dbConfig } from "../DB/dbConfig.js";

export const allMateriales = (req, res) => {
    try {
        
        const db = dbConfig();  
        db.query("SELECT * FROM materiales", (error, materiales) => {
            error && res.status(400).json({message: "Error al traer todos los materiales"});

            res.status(200).json(materiales);
        })

    } catch (error) {
        console.log("Error al traer todos los materiales");
        res.status(500).json({message: "Error al traer todos los materiales", error});
    }
}

export const materialById = (req, res) => {

    const db = dbConfig();
    const { id } = req.params;

    try {
        
        db.query("SELECT * FROM materiales WHERE id = ? LIMIT 1", [id], (error, materiales) => {
            
            if(error) return res.status(400).json({message: `Error al obtener el material con id: ${id}`});
            if(materiales.length === 0) return res.status(400).json({message: `El material con id: ${id} no existe`});
            
            res.status(200).json(materiales[0]);

        });

    } catch (error) {
        console.log("Error al el material");
        res.status(500).json({message: "Error al el material", error});
    }
}

export const createMaterial = (req, res) => {

    const { title, description } = req.body;

    try {

        const db = dbConfig();
        // verificar si exsite y agregarlo
        db.query("SELECT * FROM materiales WHERE title = ?", [title.toLowerCase()], (error, material) => {

            if(error) return res.status(400).json({message: "Error al encontrar material", error});

            if (material.length > 0) {
                if (material[0].title.toLowerCase() === title.toLowerCase()) {
                    return res.status(400).json({message: "El material ya existe"});
                }
            }

            db.query("INSERT INTO materiales(title, description) VALUES (?, ?)", [title, description], (error, material) => {

                if(error) return res.status(400).json({message: "Error al crear material", error});
                res.status(200).json({message: 'Material creado exitosamente!'});

            })
        })   

    } catch (error) {
        console.log("Error al crear el material");
        res.status(500).json({message: "Error al crear el material", error});
    }

}

export const updateMaterial = (req, res) => {
    const db = dbConfig();
    const { id } = req.params;
    const { title, description } = req.body;

    try {

        // verificar si exsite y agregarlo
        db.query("SELECT * FROM materiales WHERE id = ?", [id], (error, materiales) => {

            if(error) return res.status(400).json({message: "Error al encontrar material", error});
            if (materiales.length === 0) return res.status(400).json({message: "El material no existe"}); 

            db.query("UPDATE materiales SET title = ?, description = ? WHERE id = ?", [title, description, id], (error, material) => {
                if(error) return res.status(400).json({message: "Error al actualizar material", error});

                return res.status(200).json({message:"Actualizado exitosamente!"});

            });
        })
        
    } catch (error) {
        console.log("Error al actualizar el material");
        res.status(500).json({message: "Error al actualizar el material", error});
    }
}

export const deleteMaterial = (req, res) => {
    const db = dbConfig();
    const { id } = req.params;

    try {
        // encontrar y eliminar
        db.query("SELECT * FROM materiales WHERE id = ?", [id], (error, materiales) => {

            if(error) return res.status(400).json({message: "Error al encontrar material", error});
            if (materiales.length === 0) return res.status(400).json({message: "El material no existe"});

            db.query("DELETE FROM materiales WHERE id = ?", [id], (error, result) => {

                if(error) return res.status(400).json({message: "Error al eliminar material", error});
                return res.status(200).json({message:`Material con id: ${id} eliminado exitosamente!`});
                
            })
        })
        
    } catch (error) {
        console.log("Error al eliminar el material");
        res.status(500).json({message: "Error al eliminar el material", error});
    }
}