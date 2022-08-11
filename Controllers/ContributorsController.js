import pool from "../db.js";

class ContributorController{
    async addContributor(req, res){
        try {
            const { contributorname, contributorlink } = req.body

            const valid = await pool.query('SELECT * FROM Contributors WHERE ContributorName = $1 AND ContributorLink = $2', [contributorname, contributorlink])

            if(valid.rowCount > 0)
                return res.status(400).json('This contributor already exists')

            const newContributor = await pool.query('INSERT INTO Contributors(contributorname, contributorlink) VALUES($1, $2) RETURNING *', [contributorname, contributorlink])

            if(newContributor.rowCount > 0)
                res.status(200).json(newContributor.rows[0])
            else
                res.status(400).json('Bad request')
        } catch (e) {
            console.log(e)
        }
    }
    
    async getContributors(req, res){
        try {
            const Contributors = await pool.query('SELECT * FROM Contributors')
            res.status(200).json(Contributors.rows)
        } catch (e) {
            console.log(e)
        }
    }

    async getContributor(req, res){
        try {
            const contributorId = req.params.id

            const contributor = await pool.query('SELECT * FROM Contributors WHERE contributorid = $1', [contributorId])

            if(contributor.rowCount > 0)
                res.status(200).json(contributor.rows)
            else
                return res.status(404).json('Contributor not found')
        } catch (e) {
            console.log(e)
        }
    }

    async deleteContributor(req, res){
        try {
            const contributorId = req.params.id

            const ContributorToDelete = await pool.query('SELECT * FROM Contributors WHERE contributorid = $1', [contributorId])

            if(ContributorToDelete.rowCount === 0)
                return res.status(404).json('Contributor not found')

            const deletedContributor = await pool.query('DELETE FROM Contributors WHERE contributorId = $1', [contributorId])

            if(deletedContributor.rowCount > 0)
                res.status(200).json('Contributor successfully deleted')
            else
                return res.status(404).json('Contributor not found')
        } catch (e) {
            console.log(e)
        }
    }
}

export default new ContributorController;