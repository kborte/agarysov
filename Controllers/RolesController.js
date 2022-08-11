import pool from "../db.js";

class RolesController{
    async addRole(req,res){
        try{
            const { role } = req.body;
            const valid = await pool.query('SELECT * FROM roles WHERE role = $1', [role])

            if(valid.rowCount > 0) 
                res.status(400).json('Role already exists')

            const addedRole = await pool.query('INSERT INTO Roles (role) VALUES ($1) RETURNING *', [role])
            
            if(addedRole.rowCount > 0)
                res.status(200).json(addedRole.rows[0])
            else
                res.status(400).json('Bad request')
        }catch(e){
            console.log(e)
        }
    }

    async getRole(req,res){
        try{
            const roleId = req.params.id
            const role = await pool.query('SELECT * FROM Roles where roleid = $1', [roleId])

            if(role.rowCount > 0)
                res.json(role.rows[0])
            else 
                return res.status(404).json('Role not found')
        }catch(e){
            console.log(e)
        }
    }

    async getRoles(req, res){
        try{
            const roles = await pool.query('SELECT* FROM Roles')
            res.json(roles.rows)
        }catch(e){
            console.log(e)
        }
    }

    // async updateRole(req,res){
    //     try{
    //         const roleId = req.params.id
    //         const { role } = req.body; 
    //         const roleToUpdate = await pool.query('SELECT * FROM Roles WHERE roleid = $1', [roleId])

    //         if(roleToUpdate.rowCount <= 0)
    //             return res.status(404).json('Role not found')

    //         const updatedRole = await pool.query('UPDATE Roles SET role = $2 WHERE roleid = $1', [id, role])
            
    //         if(updatedRole.rowCount >= 0)
    //             res.status(204).json('Successfully updated')
    //         else
    //             res.status(400)
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    async deleteRole(req,res){
        try{
            const roleId = req.params.id
            const roleToDelete = await pool.query(`SELECT * FROM Roles WHERE roleid = $1`, [roleId])

            if(roleToDelete.rowCount < 0)
                return res.status(404).json('Role not found')

            const deletedRole = await pool.query('DELETE FROM Roles WHERE roleid = $1', [roleId])

            if(deletedRole.rowCount > 0)
                res.status(204).json('Successfully deleted')
            else
                res.status(400)
        }catch(e){
            console.log(e)
        }
    }
}

export default new RolesController;