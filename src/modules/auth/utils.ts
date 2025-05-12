import { cookies as getCookies } from "next/headers";

interface Props {
  value: string;
  prefix: string;
}
export const generateAuthCookie = async ({ value, prefix }: Props) => {
  const cookie = await getCookies();

  cookie.set({
    name: `${prefix}-token`,
    value,
    httpOnly: true,
    path: "/",
  });
};
