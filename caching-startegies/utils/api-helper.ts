export const getData = async <T>(
  apiURL: string,
  caller: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = new URL(apiURL);
  console.log(`[${caller}]: fetching ${url.pathname} started`);

  const startTime = performance.now();
  const response = await fetch(apiURL, options);
  const endTime = performance.now();
  const duration = (endTime - startTime).toFixed(2);

  if (!response.ok) {
    console.error(`fetch url ${url.pathname} failed`);
    throw new Error(`[${caller}]: failed to fetch ${url.pathname}`);
  }

  const data: T = await response.json();
  console.log(
    `[${caller}]: fetching ${url.pathname} completed in ${duration}ms`
  );

  return data;
};
