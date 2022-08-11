import { Router } from "express";
import AlbumsController from "../Controllers/AlbumsController.js";
import RolesController from "../Controllers/RolesController.js";
import ContributorsController from "../Controllers/ContributorsController.js";
import AlbumsContributorsRolesController from "../Controllers/AlbumsContributorsRolesController.js";
import BookingsController from "../Controllers/BookingsController.js";
import pool from "../db.js";

//add isAdmin parameter to control permissions
export const albumsRouter = new Router()
albumsRouter.get('/albums/', AlbumsController.getAlbums)
albumsRouter.get('/albums/:id', AlbumsController.getAlbum)
albumsRouter.post('/admin/albums/', AlbumsController.addAlbum)
albumsRouter.put('/admin/albums/:id', AlbumsController.updateAlbum)
albumsRouter.delete('/admin/albums/:id', AlbumsController.deleteAlbum)

export const rolesRouter = new Router()
rolesRouter.get('/roles/', RolesController.getRoles)
rolesRouter.get('/roles/:id', RolesController.getRole)
rolesRouter.post('/roles/', RolesController.addRole)
rolesRouter.delete('/roles/:id', RolesController.deleteRole)

export const contributorsRouter = new Router()
contributorsRouter.get('/contributors/', ContributorsController.getContributors)
contributorsRouter.get('/contributors/:id', ContributorsController.getContributor)
contributorsRouter.post('/contributors/', ContributorsController.addContributor)
contributorsRouter.delete('/contributors/:id', ContributorsController.deleteContributor)

export const albumsContributorsRolesRouter = new Router()
albumsContributorsRolesRouter.get('/acr/', AlbumsContributorsRolesController.getAlbumRoles)
albumsContributorsRolesRouter.get('/acr/:id', AlbumsContributorsRolesController.getAlbumRole)
albumsContributorsRolesRouter.post('/acr/', AlbumsContributorsRolesController.addAlbumRole)
albumsContributorsRolesRouter.put('/acr/:id', AlbumsContributorsRolesController.updateAlbumRole)
albumsContributorsRolesRouter.delete('/acr/:id', AlbumsContributorsRolesController.deleteAlbumRole)

export const bookingsRouter = new Router()
bookingsRouter.get('/bookings/', BookingsController.getBookings)
bookingsRouter.get('/bookings/:id', BookingsController.getBooking)
bookingsRouter.post('/bookings/', BookingsController.addBooking)
bookingsRouter.put('/bookings/:id', BookingsController.updateBooking)
bookingsRouter.delete('/bookings/:id', BookingsController.deleteBooking)
