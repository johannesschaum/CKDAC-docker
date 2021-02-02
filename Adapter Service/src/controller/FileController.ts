import { Request, Response, Router } from 'express'
import { NextFunction } from 'connect';
import { ApiResponse, ErrorResponse } from '../utils/responses/ApiResponse';
import { STORAGE_PATH } from '../config/Config';
import path from 'path';
import { logger } from '../Service';
import fs from 'fs';


const router: Router = Router();
const fileIdRegex: RegExp = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/

router.get('/:fileId', serveFile);
async function serveFile(req: Request, res: Response, next: NextFunction) {
  let response: ApiResponse;
  if (!fileIdRegex.test(req.params.fileId)) {
    response = new ErrorResponse(400, ["Bad file id"]);
    res.status(response.Code).json(response);
    return;
  }

  logger.info("--------FILE CONTROLLER - Storage path: " + STORAGE_PATH+"----");

  const filePath = `${STORAGE_PATH}/${req.userId}/${req.params.fileId}.zip`;

  logger.info("--------FILE CONTROLLER - file PATH: " + filePath+"---");

  if (filePath.startsWith('.')) {
    res.sendFile(path.join(__dirname, '../../', filePath));
  } else {
    res.sendFile(filePath);    
  }
}

export default router;
