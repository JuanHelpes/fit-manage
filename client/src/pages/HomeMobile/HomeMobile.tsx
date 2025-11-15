import Container from "@mui/material/Container";
import BottomNavBar from "../../components/BottomNavBar";
import Ficha from "../../components/Ficha/Ficha";
import { Box, Typography } from "@mui/material";


const HomeMobile: React.FC = () => {
    return (
        <Container sx={{
            m: 0,
            p: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%", // garante altura total da viewport
            width: "100vw",  // garante largura total
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        color: "#ff6f00",
                        mb: 2,
                        mt: 3,
                    }}
                >
                    Ficha Atual
                </Typography>
                <Ficha />
            </Box>
            <BottomNavBar />
        </Container>
    );
};

export default HomeMobile;