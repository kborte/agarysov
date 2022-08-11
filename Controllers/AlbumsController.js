import pool from "../db.js";

class AlbumsController{
    async addAlbum(req, res){
        try {
            const {title, coverphotopath, typeid, datecreated, description} = req.body
            
            const valid = await pool.query('SELECT * FROM Albums WHERE title = $1', [title])

            if (valid.rowCount > 0)
                return res.status(400).json('Album with this title already exists')

            const newAlbum = await pool.query('INSERT INTO Albums(title, coverphotopath, typeid, datecreated, description) VALUES($1, $2, $3, $4, $5) RETURNING *', [title, coverphotopath, typeid, datecreated, description]);
            
            if (newAlbum.rowCount >= 0)
                res.status(200).json(newAlbum.rows)
            else
                res.status(400).json('Bad request')
        } catch (err) {
            console.log(err)
        }
    }

    async getAlbum(req, res){
        try {
            const albumId = req.params.id
            const album = await pool.query('SELECT * FROM Albums WHERE AlbumId = $1', [albumId])
            
            if(album.rowCount > 0){
                const roles = await pool.query('SELECT ContributionId, ContributorName, ContributorLink, Role FROM AlbumsContributorsRoles INNER JOIN Contributors ON AlbumsContributorsRoles.contributorid = Contributors.contributorid INNER JOIN Roles ON AlbumsContributorsRoles.roleid = Roles.roleid WHERE albumid = $1', [albumId])
                
                const albumInfo = {album: album.rows, roles: roles.rows}
                res.status(200).json(albumInfo)
            }
            else
                return res.status(404).json('Album not found')
        } catch (e) {
            console.log(e)
        }
    }

    async getAlbums(req, res){
        try {
            const albums = await pool.query('SELECT * FROM Albums')
            res.json(albums.rows)
        } catch (e) {
            console.log(e)
        }
    }

    async updateAlbum(req, res){
        try {
            const albumId = req.params.id
            const {title, coverphotopath, typeid, datecreated, description} = req.body

            const albumToUpdate = await pool.query('SELECT * from Albums WHERE AlbumId = $1', [albumId])

            if (albumToUpdate.rowCount <= 0)
                return res.status(404).json('Album not found')
            
            const updatedAlbum = await pool.query('UPDATE Albums SET title = $2, coverphotopath = $3, typeid = $4, datecreated = $5, description = $6 WHERE AlbumId = $1', [albumId, title, coverphotopath, typeid, datecreated, description])
            if(updatedAlbum.rowCount >= 0)
                return res.status(204)
            else
                return res.status(400).json('Bad request')
        } catch (e) {
            console.log(e)
        }
    }

    async deleteAlbum(req, res){
        try {
            const albumId = req.params.id

            const albumToDelete = await pool.query('SELECT * FROM Albums WHERE AlbumId = $1', [albumId])

            if(albumToDelete.rowCount <= 0)
                return res.status(404).json('Album not found')

            const deletedAlbum = await pool.query('DELETE FROM Albums WHERE AlbumId = $1', [albumId])
            if(deletedAlbum.rowCount > 0)
                return res.status(204).json('Album deleted successfully')
            else
                return res.status(400).json('Bad request')
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AlbumsController()