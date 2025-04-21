
import crypto from "crypto";
import { ENCRYPTION_IV, ENCRYPTION_KEY } from "../config/config";



const algorithm='aes-256-cbc';
const key=ENCRYPTION_KEY!;
const iv=ENCRYPTION_IV!;



export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  }
  
  export function decrypt(text: string): string {
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}