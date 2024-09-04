
import bcrypt from "bcryptjs";

import type {
	UnAuthenticatedUser,
	PreRegisteredUser,
} from "@/models/user.server";
import {
	passwordPresenceGuard,errorMessage,
	passwordTypeGuard,DEFAULT_SALT_ROUNDS, logger, 
	passwordBufferGuard,
} from "@/utilities/password-hashers/helpers";

export const hashPassword = ({ password }: PreRegisteredUser, ...args: unknown[]) => {
  try {
    if (passwordTypeGuard(password)) {
      passwordPresenceGuard(password);
      passwordBufferGuard(Buffer.from(password));
      return new Promise((resolve) =>
        bcrypt.hash(password, DEFAULT_SALT_ROUNDS, (error, hash) => {
          if (!error) return resolve(hash);
          logger.write(
            errorMessage(error, { extra: `${Date.now()}|Error occured| bcrypt|password hasher| input length: ${password.length}|${JSON.stringify(error)}`}
            ),
          );
          throw error;
        }),
      );
    }
    return null;
  
  } catch (error) {
      logger.write(errorMessage(error as Error, { extra: ''}))
      return null
  }
};

export const verifyPassword = ({
	hash,
	password,
}: UnAuthenticatedUser,): Promise<boolean> =>
	new Promise((resolve) =>
		bcrypt.compare(password, hash, (error, result) => {
			if (!error) return resolve(result);
			logger.write(
				errorMessage({
          ...error, extra: `
          
          
          ${Date.now()}|Error occured| bcrypt|hash verifyer |
           ${JSON.stringify(error)}`,}		
				),
			);
			return resolve(false);
		}),
	);

  hashPassword({password: "abcd"})?.then(r=> console.log(r))