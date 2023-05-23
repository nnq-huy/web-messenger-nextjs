import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import Header from "./components/header/Header";
import ToasterContext from "./context/ToasterContext";


export const metadata = {
	title: 'nextMessage',
	description: 'Web Messenger',
  }
  
  export default function RootLayout({
	children,
  }: {
	children: React.ReactNode
  }) {
	return (
	  <html lang="en">
		<body>
		  <AuthContextProvider>
			<ToasterContext />
			<Header>
				{children}
			</Header>
		  </AuthContextProvider>
		</body>
	  </html>
	)
  }




