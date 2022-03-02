// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { qsonCabrillo } from '@ham2k/qson/cabrillo'

export function App() {
  return (
    <>
      <h1>Ham2K</h1>
      {qsonCabrillo()}
      <div />
    </>
  );
}

export default App;
