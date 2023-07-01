import {Router} from 'express'
import { isAuthenticated } from './middlewares/isAuthenticated'
import CreateUserController from './controllers/user/CreateUserController'
import AuthUserController from './controllers/user/AuthUserController'
import DetailUserController from './controllers/user/DetailUserController'
import UpdateDepositoController from './controllers/deposito/UpdateDepositoController'
import UpdateSaqueController from './controllers/saque/UpdateSaqueController'
import UpdateTransferController from './controllers/transfer/UpdateTransferController'
import ExtratoDepositoController from './controllers/extrato/ExtratoDepositoController'
import ExtratoSaqueController from './controllers/extrato/ExtratoSaqueController'
import ExtratoTransferController from './controllers/extrato/ExtratoTransferController'
import ExtratoTransferResController from './controllers/extrato/ExtratoTransferResController'

const router = Router()

// -- ROUTES USER --
router.post('/login', new AuthUserController().handle)
router.post('/users', new CreateUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- ROUTES DEPOSITO --
router.post('/deposito', isAuthenticated, new UpdateDepositoController().handle)
router.get('/extrato/deposito', isAuthenticated, new ExtratoDepositoController().handle)

// -- ROUTES SAQUE --
router.post('/saque', isAuthenticated, new UpdateSaqueController().handle)
router.get('/extrato/saque', isAuthenticated, new ExtratoSaqueController().handle)

// -- ROUTES TRANSFERENCIA --
router.post('/transfer', isAuthenticated, new UpdateTransferController().handle)
router.get('/extrato/transfer', isAuthenticated, new ExtratoTransferController().handle)
router.get('/extrato/transferresp', isAuthenticated, new ExtratoTransferResController().handle)

export {router}