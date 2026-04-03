import HeroBackground from './components/HeroBackground/HeroBackground';
import Header from './components/Header/Header';

function App() {
  return (
    // 2. Lo renderizas como cualquier otro componente
    <div className="App">
      <Header />
      <HeroBackground />

      {/* NOTA: Como HeroBackground ya tiene estilos de ancho y alto completo (100vw, 100vh),
         no necesitas meterlo en otro contenedor especial, a menos que tengas más secciones abajo.
      */}
    </div>
  );
}

export default App;