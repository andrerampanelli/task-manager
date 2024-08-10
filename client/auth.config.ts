import { NextAuthConfig, User } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { AuthApi } from './services/auth.api';
import { z } from 'zod';

interface Auth extends User {
  token: string;
}

async function login(credentials: any) {
  try {
    const authApi = new AuthApi();

    const { token, name, email } = await authApi.login({
      email: credentials.email,
      password: credentials.password
    });

    const user = {
      name,
      email,
      token
    };

    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req): Promise<Auth | null> {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8)
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        try {
          const { email, password } = parsedCredentials.data;

          const auth = await login({ email, password });

          if (!auth) {
            return null;
          }

          const user = {
            email: auth?.email,
            name: auth?.name,
            token: auth?.token
          };

          console.log('user', user);

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  },
  pages: {
    signIn: '/'
  }
};

export default authConfig;
