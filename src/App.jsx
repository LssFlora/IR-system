import './App.css';
import router from "./router/index"
import { useRoutes } from 'react-router-dom';
import { ConfigProvider } from 'antd';

function App() {
  const routeCom = useRoutes(router)
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4966df',
        },
      }}
    >
      <div className="App">
        {routeCom}
      </div>
    </ConfigProvider>
  );
}

export default App;
