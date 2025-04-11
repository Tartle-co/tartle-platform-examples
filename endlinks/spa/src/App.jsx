import './App.css';
import { RouterProvider } from './components/RouterContext';
import { Routes } from './components/Routes';
import { TartleIcon } from './components/SVG';
import EndlinkLandingPage from './EndlinkLandingPage';
import { EndlinkTokenProvider } from './components/EndlinkContext';
import FormPage from './FormPage';
import CompletionRequestsPage from './CompletionRequestsPage';
import CompletionRedirectsPage from './CompletionRedirectsPage';

const HomePage = () => <></>;
const NotFoundPage = () => (
  <div className='text-center text-white text-2xl'>404 - Not Found</div>
);

const routes = [
  { path: '/', component: HomePage },
  { path: '/endlink-landing', component: EndlinkLandingPage },
  { path: '/completion-requests', component: CompletionRequestsPage },
  { path: '/completion-redirects', component: CompletionRedirectsPage },
  { path: '/form', component: FormPage },
  { path: '*', component: NotFoundPage }
];

function App() {
  return (
    <>
      <header className='navbar relative z-[500] container mx-auto px-4 sm:px-6 lg:px-8 flex text-gray-300'>
        <nav aria-label='Logo menu' className='relative z-[60] flex'>
          <a
            href='https://tartle-co.github.io/devportal/endlinks/scripts'
            aria-label='The TARTLE logo'
          >
            <TartleIcon />
          </a>
        </nav>
      </header>
      <RouterProvider>
        <div className='relative w-full h-full overflow-hidden -mt-24 pt-24 '>
          <main>
            <EndlinkTokenProvider>
              <Routes routes={routes} />
            </EndlinkTokenProvider>
          </main>
        </div>
      </RouterProvider>
    </>
  );
}

export default App;
