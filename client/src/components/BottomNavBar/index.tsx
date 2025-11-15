import * as React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define a rota atual como valor
  const [value, setValue] = React.useState(location.pathname);

  // Atualiza quando a URL muda (ex: se navegar via botão)
  React.useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid #ddd",
        bgcolor: "#fff",
        zIndex: 10,
      }}
      elevation={4}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
        showLabels
        sx={{
          "& .Mui-selected": {
            color: "#ff6b00 !important",
            fontWeight: "bold",
          },
          "& .MuiBottomNavigationAction-root:hover": {
            color: "#ff8c42", // cor ao passar o dedo/mouse
          },
        }}
      >
        <BottomNavigationAction
          label="Ficha"
          value="/home"
          color="#000"
          icon={<ListAltIcon />}
        />
        <BottomNavigationAction
          label="Histórico"
          value="/history"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Evolução"
          value="/InfosUser"
          icon={<FitnessCenterIcon />}
        />
        <BottomNavigationAction
          label="Perfil"
          value="/user"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
