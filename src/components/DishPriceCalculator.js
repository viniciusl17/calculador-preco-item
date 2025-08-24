import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Stack,
  Collapse,
  Alert
} from '@mui/material';
import { Calculate, Clear } from '@mui/icons-material';

// Função para formatar o resultado final em moeda
const formatCurrency = (value) => {
  if (value === null || isNaN(value)) return '';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const DishPriceCalculator = () => {
  const [inputs, setInputs] = useState({
    dishCost: '',
    profitMargin: '',
    marketplaceFee: '',
    deliveryFee: '',
  });
  const [salePrice, setSalePrice] = useState(null);
  const [error, setError] = useState('');

  // Handler para formatar campos de moeda (R$) enquanto digita
  const handleCurrencyChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value.replace(/\D/g, '');
    formattedValue = (Number(formattedValue) / 100).toFixed(2).replace('.', ',');
    setInputs((prev) => ({ ...prev, [name]: formattedValue }));
  };

  // Handler para campos de porcentagem (%)
  const handlePercentageChange = (event) => {
    const { name, value } = event.target;
    const numericValue = value.replace(/[^\d.]/g, ''); // Permite apenas números e ponto
    setInputs((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleClear = () => {
    setInputs({ dishCost: '', profitMargin: '', marketplaceFee: '', deliveryFee: '' });
    setSalePrice(null);
    setError('');
  };

  const handleCalculate = () => {
    const { dishCost, profitMargin, marketplaceFee, deliveryFee } = inputs;

    if (!dishCost || !profitMargin || !marketplaceFee) {
      setError('Custo do Prato, Margem de Lucro e Taxas são obrigatórios.');
      setSalePrice(null);
      return;
    }

    const cost = parseFloat(dishCost.replace(',', '.'));
    const margin = parseFloat(profitMargin);
    const fee = parseFloat(marketplaceFee);
    const delivery = deliveryFee ? parseFloat(deliveryFee.replace(',', '.')) : 0;

    if (isNaN(cost) || isNaN(margin) || isNaN(fee)) {
      setError('Por favor, verifique os valores digitados.');
      setSalePrice(null);
      return;
    }

    if (margin + fee >= 100) {
      setError('A soma da Margem de Lucro e das Taxas não pode ser igual ou superior a 100%.');
      setSalePrice(null);
      return;
    }

    // A fórmula correta para precificação embutindo taxas e lucro (markup divisor)
    const priceWithoutDelivery = cost / (1 - (margin / 100) - (fee / 100));
    const finalPrice = priceWithoutDelivery + delivery;

    setSalePrice(finalPrice);
    setError('');
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 2, maxWidth: '700px', mx: 'auto' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Calculadora Para Precificar Itens
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
          Defina o preço ideal do seu item incluindo todos os custos necessários.
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Custo do Item (R$)" name="dishCost" placeholder="Ex: 10,00" value={inputs.dishCost} onChange={handleCurrencyChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Margem de Lucro (%)" name="profitMargin" placeholder="Ex: 30" value={inputs.profitMargin} onChange={handlePercentageChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Taxas Marketplace (%)" name="marketplaceFee" placeholder="Ex: 15" value={inputs.marketplaceFee} onChange={handlePercentageChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Taxa de Entrega (R$)" name="deliveryFee" placeholder="Ex: 5,00" value={inputs.deliveryFee} onChange={handleCurrencyChange} />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="outlined" color="secondary" startIcon={<Clear />} onClick={handleClear}>Limpar</Button>
          <Button variant="contained" color="secondary" size="large" startIcon={<Calculate />} onClick={handleCalculate} sx={{ color: 'white', fontWeight: 'bold' }}>Calcular Preço</Button>
        </Stack>
        
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>{error}</Alert>
        </Collapse>

        {salePrice !== null && (
          <Box sx={{ mt: 4, p: 3, borderRadius: 2, backgroundColor: 'background.default', textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">Preço de Venda Sugerido:</Typography>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>{formatCurrency(salePrice)}</Typography>
          </Box>
        )}
      </Paper>

      {/* Seção de Informações Adicionais */}
      <Box sx={{ maxWidth: '700px', mx: 'auto', mt: 5, p: 3, backgroundColor: 'background.paper', borderRadius: 2, opacity: 0.9 }}>
          <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
            O problema
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sem um cálculo preciso, você pode cobrar preços errados, perdendo clientes ou margem de lucro.
          </Typography>
          <Box my={2}><hr style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)' }} /></Box>
          <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
            Como funciona
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
            Preço = (Custo / (1 - %Lucro - %Taxas)) + Entrega
          </Typography>
      </Box>
    </Box>
  );
};

export default DishPriceCalculator;