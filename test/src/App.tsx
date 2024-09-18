import {
  AddDeviceButton,
  DeviceCard,
  DeviceMostVisitedSitesCard,
  DeviceScreenTimeCard,
} from './dist'

const App: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '50%',
        height: '110vh',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'start',
        justifyContent: 'start',
        alignItems: 'start',
        alignContent: 'start',
        rowGap: '20px',
        marginLeft: '100px',
        marginTop: '100px',
        margin: 0,
        padding: '48px',
      }}
    >
      <DeviceCard
        email="jaren.jeffery22@gmail.com"
        deviceId="00b53a37d8d8834f"
        onClickOpen={() => {
          console.log('test')
        }}
      />

      <AddDeviceButton onClick={() => console.log('hi I was clicked :)')} />

      <DeviceMostVisitedSitesCard
        email="jaren.jeffery22@gmail.com"
        deviceId="00b53a37d8d8834f"
      />

      <DeviceScreenTimeCard
        email="jaren.jeffery22@gmail.com"
        deviceId="00b53a37d8d8834f"
      />
    </div>
  )
}

export default App

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
