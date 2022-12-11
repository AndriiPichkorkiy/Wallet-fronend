import React from 'react';
import { useState, useEffect } from 'react';
import { getMonoCurrency } from "../../api/services";
import Loader from '../Loader/Loader';
import currencyImg from "../../assets/images/authImg/CurrencyVector.png"
import { TableWrapper, TableCurrency, ImgCurrency, TableHeader, TableHeaderCell, TableBody, TableLoader } from './Currency.styled';
// import { default as data } from './CurrencyData';
// import { color } from '@mui/system';
import ErrorPlug from './ErorPlug';



const MonoCurrency = () => {
    const [state, setState] = useState({
        items: [],
        loading: false,
        error: null,
    })

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                setState({
                    ...state,
                    loading: true,
                    error: null,
                })

                const result = await getMonoCurrency();
                // const result = data
                setState(prevState => {
                    return {
                        ...prevState,
                        items: result,
                        loading: false,
                        error: null,
                    }
                })
            } catch (error) {
                setState({
                    ...state,
                    error,
                })
            }
            finally {
                setState(prevState => {
                    return {
                        ...prevState,
                        loading: false,
                    }
                })
            }
        }
        fetchCurrency()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setState])


    const { items, loading, error } = state;


    const element = items.filter(({ currencyCodeA, currencyCodeB }) => currencyCodeA === 840 || (currencyCodeA === 978 && currencyCodeB === 980) || currencyCodeA === 985)
        .map(({ currencyCodeA, rateBuy, rateSell, rateCross }) =>
            <tr key={currencyCodeA}>
                <td>{currencyCodeA === 840 ? currencyCodeA = "USD" : currencyCodeA = currencyCodeA
                    && (currencyCodeA === 978 ? currencyCodeA = "EUR" : currencyCodeA)
                    && (currencyCodeA === 985 ? currencyCodeA = "PLN" : currencyCodeA)}
                </td>
                <td>{rateBuy || rateCross.toFixed(2)}</td>
                <td>{rateSell || rateCross.toFixed(2)}</td>
            </tr>
        );

    return (
        <TableWrapper>
            <TableCurrency>
                <TableHeader>
                    <tr>
                        <TableHeaderCell>Currency</TableHeaderCell>
                        <TableHeaderCell>Purchase</TableHeaderCell>
                        <TableHeaderCell>Sale</TableHeaderCell>
                    </tr>
                </TableHeader>
                <TableBody>{error ? <ErrorPlug /> : element}
                    <tr><td><ImgCurrency src={currencyImg} alt="img" /></td></tr>
                </TableBody>
            </TableCurrency >
            <TableLoader>{loading && <Loader />}</TableLoader>
        </TableWrapper >
    )
};

export default MonoCurrency;
