import md5 from 'crypto-js/md5';

/**
 * Generate a Gravatar URL for a given email address
 * @param email The email address to generate a Gravatar for
 * @param size The size of the image in pixels (default: 80)
 * @param defaultImage The default image to use if no Gravatar is found (default: 'retro')
 * @returns The Gravatar URL
 */
export const getGravatarUrl = (
  email: string = '',
  size: number = 80,
  defaultImage: string = 'retro'
): string => {
  if (!email) {
    return `https://www.gravatar.com/avatar/?s=${size}&d=${defaultImage}`;
  }

  // Trim whitespace and convert to lowercase
  const normalizedEmail = email.trim().toLowerCase();

  // Generate MD5 hash of the email
  const emailHash = md5(normalizedEmail).toString();

  // Return the Gravatar URL
  return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=${defaultImage}`;
};
