/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }
  hookTimeout: 40000,
  MAILGUN_SMTP_LOGIN: "postmaster@sandbox9b2a9ec5d4be42709bda7c03a97fd7b9.mailgun.org", 
  MAILGUN_SMTP_PASSWORD: "f4188e12667eb874599cda9ff080716c-bdd08c82-17ecd52a"
};
