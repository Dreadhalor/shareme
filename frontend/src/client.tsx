import SanityClientConstructor from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url/';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = SanityClientConstructor({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-11-16',
  // set useCdn to `false` to prevent stale images when content is updated
  useCdn: false,
  // for a real app never EVER put a sensitive access token in client-side code!
  token: process.env.REACT_APP_SANITY_TOKEN,
  // we need to turn the warning off because this isn't a real app so we're exposing the token
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
