import styled from "styled-components";
import { SmallBackground } from "../../components/Background";
import DataFilter from "./DataFilter";
import { FilterContext } from "./FilterContext";
import { useContext, useEffect } from "react";
import DataElement from "./DataElement";
import { tableData } from "../../../table";
import { useSort } from "../../hooks/useSort";

const BackgroundInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 48px;
    width: 100%;
    gap: 8px;
    color: white;
    h1{
        font-size: ${({ theme }) => theme.fontSize.xxxl};
    }
`

const DataLayout = styled.section`
    max-width: 95vw;
    margin: 64px auto;
    display: flex;
    gap: ${({ theme }) => theme.size.base};
`

const FilterSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size.sm};
    height: 100%;
    width: ${({theme}) => theme.size.xxxxl};
`

const DataSection = styled.section`
    flex-grow: 1;
    height: 100%;
    display: table;
    border-collapse: collapse;
    &>*:nth-child(even){
        background-color: #EEEEEE;
    }
    &>*:last-child{
        /* border-bottom: 1px solid black; */
    }
    /* flex-direction: column; */
    /* gap: ${({ theme }) => theme.size.sm}; */
`

const DataHeader = styled.section`
    display: table-row;
    border: 1px solid #AAA;
    border-bottom: 4px solid #AAA;
    p{
        display: table-cell;
        font-size: ${({ theme }) => theme.fontSize.md};
        font-weight: 700;
        padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.xs};
        word-break: break-all;
    }
`

// const DummyData: GSMData = {
//     GSM_ID: "GSM1333370",
//     GSE_ID: "GSE55280",
//     disease: "IRI",
//     tissue: "hippocampus",
//     genotype: "NAG",
//     replicate_num: "r1",
//     age: "NAA",
//     species: "MMU"
// }

// const LongestData: GSMData = {
//     GSM_ID: "GSM8124172",
//     GSE_ID: "GSE55280",
//     disease: "DbCM",
//     tissue: "peritoneal_macrophages",
//     genotype: "LysM-Cre+R26-stop-EYFP/TGfbr2KO",
//     replicate_num: "r1(Isoproterenol&Minocycline)",
//     age: "NAA(adult)",
//     species: "MMU"
// }


type DataFilterType = {
    column: string;
    valueList: Array<string>;
    valueCount: Array<number>;
}

const Data = () => {
    const { filter } = useContext(FilterContext)!;

    const [DataList, _, setDataList] = useSort(tableData);

    const OriginalData = tableData;

    useEffect(() => {
        const filterList = Object.entries(filter).filter(([_, value]) => value.size > 0);
        const filteredList = OriginalData.filter((Data) => {
            let flag = true
            filterList.forEach(([column, valueSet]) => {
                if(!valueSet.has(Data[column]))
                    flag = false
            })
            return flag;
        })
        console.log(filter);
        console.log(filterList);
        console.log(filteredList);
        setDataList([...filteredList])
    }, [filter]);

    const DataFilterGroup:{
        [key: string]: DataFilterType
    } = {};

    Object.entries(tableData[0]).forEach(([key, _]) => {
        DataFilterGroup[key] = {
            column: key,
            valueList: [],
            valueCount: []
        }
    })
    tableData.forEach((table) => {
        Object.entries(table).forEach(([key, value]) => {
            const index = DataFilterGroup[key].valueList.indexOf(value);
            if(index == -1){
                DataFilterGroup[key].valueList.push(value);
                DataFilterGroup[key].valueCount.push(1);
            }
            else{
                DataFilterGroup[key].valueCount[index]++;
            }
        })
    })

    delete DataFilterGroup["GSE_ID"]
    delete DataFilterGroup["GSM_ID"]

    return (
        <>
            <SmallBackground>
                <BackgroundInfo>
                    <h1>
                        Data
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </BackgroundInfo>
            </SmallBackground>
            <DataLayout>
                    <FilterSection> 
                        {Object.entries(DataFilterGroup).map(([_, value]) => {
                            return(
                                <DataFilter key={value.column} {...value} />
                            )
                        })}
                    </FilterSection>
                <DataSection>
                    <DataHeader>
                        <p>
                            GSM ID
                        </p>
                        <p>
                            GSE ID
                        </p>
                        <p>
                            Disease
                        </p>
                        <p>
                            Tissue
                        </p>
                        <p>
                            Genotype
                        </p>
                        <p>
                            Replicate Number
                        </p>
                        <p>
                            age
                        </p>
                        <p>
                            species
                        </p>
                    </DataHeader>
                    {DataList.map((table) => {
                        return(
                            <DataElement key={table.GSM_ID} {...table} />
                        )
                    })}
                </DataSection>
            </DataLayout>
        </>
    )
}

export default Data;