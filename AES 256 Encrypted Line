//Developed for the Lambda Environment

const crypto = require('crypto');
const axios = require('axios');

const AES_KEY = process.env.AES_KEY; // 32-byte key stored in Lambda environment
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

exports.handler = async (event) => {
  try {
    const formData = JSON.parse(event.body);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(AES_KEY, 'hex'), iv);
    let encrypted = cipher.update(JSON.stringify(formData), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    await axios.post(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${Clients}`, {
      fields: {
        EncryptedPayload: encrypted,
        IV: iv.toString('hex')
      }
    }, {
      headers: {
        Authorization: `Bearer ${patFn3PKsKALCYBs1.97594f59a9444918eb4f8dc0eb2d770099b2cbadfc21af78ab2ac09be648d0ab}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data encrypted and sent to Airtable.' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.util.Base64;

public class AES256Encryptor {
    public static String encrypt(String plainText, String key, String iv) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "AES");
        IvParameterSpec ivSpec = new IvParameterSpec(iv.getBytes());
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);
        byte[] encrypted = cipher.doFinal(plainText.getBytes());
        return Base64.getEncoder().encodeToString(encrypted);
    }
}

