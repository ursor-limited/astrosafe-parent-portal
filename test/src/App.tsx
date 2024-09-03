import { FoldersPage, ProfilesPage } from './dist';

const App: React.FC = () => {
  return (
    <div>
      <FoldersPage />
    </div>
  );
};

export default App;

/* 
// Add this cookie middleware if you haven't already
app.use(express.cookieParser());

const clientId = 'troomi';
const clientSecret = 'wkRR3DYzpFuNEEDxIWiUaPHIong0gdae'

app.use((req, res, next) => {
  const resp = await fetch('http://api.astrosafe.co/confidential/login', {
    method: 'POST',
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  // Example response would be: {"access_token": "eyJhbGciOiJFZERTQSIsInR5cCIgOiAiSld..."}
  // The access_token is truncated for the sake of presentation
  const data = await resp.json();

  // Make sure you set your cookies to be httpOnly, secure, and have a sameOrigin of "strict" for safety!
  res.cookie('access_token', data.access_token, {
    httpOnly: true,
    secure: true,
    sameOrigin: 'strict',
  });

  res.send('whatever you want to return');
});
*/
