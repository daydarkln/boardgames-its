import type { ReactNode } from 'react'

import { Theme } from '@radix-ui/themes'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'

import { AuthProvider, useAuth } from './auth'

import '@radix-ui/themes/styles.css'
import './index.css'
import './scaffold.css'

interface AppProps {
  children?: ReactNode
}

const App = ({ children }: AppProps) => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <Theme
        appearance="dark"
        accentColor="violet"
        grayColor="slate"
        panelBackground="translucent"
        radius="large"
        scaling="100%"
      >
        <AuthProvider>
          <RedwoodApolloProvider useAuth={useAuth}>
            {children}
          </RedwoodApolloProvider>
        </AuthProvider>
      </Theme>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
