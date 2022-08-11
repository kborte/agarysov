import pool from "../db.js";

class AlbumsContributorsRolesController{
    async addAlbumRole(req, res){
        try {
            const{albumid, roleid, contributorid} = req.body

            const valid = await pool.query('SELECT * FROM AlbumsContributorsRoles WHERE albumid = $1 and contributorid = $2 and roleid = $3', [albumid, contributorid, roleid])

            if(valid.rowCount > 0)
                return res.status(400).json('This Contributor is already added to the Album')
            
            const albumRole = await pool.query('INSERT INTO AlbumsContributorsRoles(albumid, contributorid, roleid) VALUES($1, $2, $3) RETURNING *', [albumid, contributorid, roleid])

            if (albumRole.rowCount > 0)
                res.status(200).json('Contributor added successfully')
            else
                res.status(400).json('Bad request')
        } catch (e) {
            console.log(e)
        }
    }

    async getAlbumRoles(req, res){
        try {
            const albumRoles = await pool.query('SELECT * FROM AlbumsContributorsRoles')
            res.status(200).json(albumRoles.rows)
        } catch (e) {
            console.log(e)
        }
    }

    async getAlbumRole(req, res){
        try {
            const albumRoleId = req.params.roleId

            const albumRole = await pool.query('SELECT * FROM AlbumsContributorsRoles WHERE contributionid = $1', [albumRoleId])

            if(albumRole.rowCount > 0)
                res.status(200).json(albumRole.rows[0])
            else
                res.status(404).json('Contributor not found')
        } catch (e) {
            console.log(e)
        }
    }

    async updateAlbumRole(req, res){
        try {
            const albumRoleId = req.params.roleId

            const albumRoleToUpdate = await pool.query('SELECT * FROM AlbumsContributorsRoles WHERE contributionid = $1', [albumRoleId])

            if(albumRoleToUpdate.rowCount === 0)
                return res.status(404).json('Contributor not found')

            const {albumid, contributorid, roleid} = req.body
            const updatedAlbumRole = await pool.query('UPDATE AlbumsContributorsRoles SET albumid = $2, contributorid = $3, roleid = $4 WHERE contributionid = $1', [albumRoleId, albumid, contributorid, roleid])

            if(updatedAlbumRole.rowCount > 0)
                res.status(200).json('Album contributor was successfully updated')
            else
                res.status(400).json('Bad request')
        } catch (e) {
            console.log(e)
        }
    }

    async deleteAlbumRole(req, res){
        try {
            const albumRoleId = req.params.roleId

            const albumRoleToDelete = await pool.query('SELECT * FROM AlbumsContributorsRoles WHERE contributionid = $1', [albumRoleId])

            if(albumRoleToDelete.rowCount === 0)
                return res.status(404).json('Contributor not found')

            const deletedAlbumRole = await pool.query('DELETE FROM AlbumsContributorsRoles WHERE contributionid = $1', [albumRoleId])

            if(deletedAlbumRole.rowCount > 0)
                res.status(200).json('Contributor was successfully deleted from the album')
            else
                res.status(400).json('Bad request')
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AlbumsContributorsRolesController