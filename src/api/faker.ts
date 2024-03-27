export async function faker<T>(data: T, delay: number = 300) {
  console.log('Fetching:', data);
  await new Promise((resolve) => setTimeout(resolve, delay));
  return data;
}

export const getId = () => Math.floor(Math.random() * 1000);
