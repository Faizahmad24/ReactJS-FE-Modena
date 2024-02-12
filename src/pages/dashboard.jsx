import { useLogin } from "../hooks/useLogin"
import { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FileUpload } from 'primereact/fileupload';
import React from 'react';
import { useRef } from "react";
import Button from "../components/Elements/Button";
import 'primeicons/primeicons.css';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';

// DataTable
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from "../Services/ProductService";

// Sidebar AntDesign
import {
    AppstoreOutlined,
    ShopOutlined,
    TeamOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu, theme } from 'antd';
  const { Header, Content, Footer, Sider } = Layout;
  const items = [
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `Dashboard ${index + 1}`,
  }));

const DashboardPage  = () => {
    const [value, setValue] = useState('');
    const isLogin = useLogin()
    const toast = useRef(null);
    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    // chart
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Dataset 1',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    // data: [50, 25, 12, 48, 90, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: [21, 84, 24, 75, 37, 65, 34]
                },
                {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);

        
    }, []);
    
    // Doughnut chart
    const [doughnutChartData, setDoughnutChartData] = useState({});
    const [doughnutChartOptions, setDoughnutChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Series 1', 'Series 2', 'Series 3'],
            datasets: [
                {
                    data: [100, 200, 300],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-700'), 
                        documentStyle.getPropertyValue('--green-500'), 
                        documentStyle.getPropertyValue('--green-200')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setDoughnutChartData(data);
        setDoughnutChartOptions(options);
    }, []);

    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    // DataTable
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProductsMini().then(data => setProducts(data));
    }, []);
    
    return(
        <>
            <Layout hasSider>
                <Sider
                    style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    }}
                >
                    <div className="flex font-bold mt-10 mb-5">
                        <img className='w-14 h-14' src="../public/images/B-dashboard.png" alt="" />
                        <p className='py-4 text-lg text-white'>B2b Portal</p>
                    </div>
                    <h1 className="text-white px-4 mb-3">Menu</h1>
                    <div className="demo-logo-vertical" />
                    <Menu className="" theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
                </Sider>
                <Layout
                    style={{
                    marginLeft: 200,
                    }}
                    className="overflow-auto"
                >
                    <Content>
                        <div className="flex justify-between w-full bg-white">
                            <div className="w-full max-w-md flex items-center">
                                    <span className="p-input-icon-left ml-10 border rounded">
                                        <i className="pi pi-search" />
                                        <InputText className="mr-5 w-full h-10 bg-slate-100 font-bold" placeholder="Search for stock and more" />
                                    </span>
                            </div>
                            <div className="w-full max-w-md mt-5">
                                <img src="../public/images/header-dashboard.png" alt="" />
                            </div>
                        </div>
                        <div className="mt-5 border bg-white">
                            <div className="flex w-full h-20 border rounded justify-between">
                                <div className="">
                                    <h1 className="ml-5 mt-5">Dashboard</h1>
                                    <span className="ml-5 text-slate-400">These companies have a dashboard</span>
                                </div>
                                <div className="mt-5 mr-5">
                                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />
                                </div>
                            </div>
                            <div className="flex w-full rounded mt-4 gap-2 ml-10">
                                    <Button classname="bg-white text-black border">12 months</Button>
                                    <Button classname="bg-white text-black border">6 months</Button>
                                    <Button classname="bg-white text-black border">3 months</Button>
                                    <Button>30 days</Button>
                                    <Button classname="bg-white text-black border">7 days</Button>
                                    <Button classname="bg-white text-black border">24 hours</Button>
                            </div>
                            <div className="flex flex-wrap ml-10 mb-10">
                                    <div className="mt-5 w-60">
                                        <div className=" h-24 rounded-lg p-3 border">
                                            <span>Vendor/ Suplier</span>
                                            <h1 className="font-bold text-2xl">1000</h1>
                                            <i className="pi-arrow-up"></i><span>23% Last Month</span>
                                        </div>
                                    </div>
                                    <div className="mt-5 ml-5 w-60">
                                        <div className=" h-24 rounded-lg p-3 border">
                                            <span>Customer/ Dealer</span>
                                            <h1 className="font-bold text-2xl">920</h1>
                                            <i className="pi-arrow-up"></i><span>10% Last Month</span>
                                        </div>
                                    </div>
                                    <div className="mt-5 ml-5 w-60">
                                        <div className=" h-24 rounded-lg p-3 border">
                                            <span>Prodcuts/ SKU</span>
                                            <h1 className="font-bold text-2xl">620</h1>
                                            <i className="pi-arrow-up"></i><span>23% Last Month</span>
                                        </div>
                                    </div>
                                    <div className="mt-5 ml-5 w-60">
                                        <div className=" h-24 rounded-lg p-3 border">
                                            <span>Purchase Order</span>
                                            <h1 className="font-bold text-2xl">3200</h1>
                                            <i className="pi-arrow-up"></i><span>23% Last Month</span>
                                        </div>
                                    </div>
                            </div>
                            <div className="flex flex-wrap ml-10 mb-10">
                                    <div className="mt-5 w-60">
                                        <div className=" h-24 rounded-lg p-3 border">
                                            <span>Sales/ Order</span>
                                            <h1 className="font-bold text-2xl">2000</h1>
                                            <i className="pi-arrow-up"></i><span>23% Last Month</span>
                                        </div>
                                    </div>
                                    <div className="mt-5 ml-5 w-60">
                                        <div className=" h-24 rounded-lg p-3 border">
                                            <span>......</span>
                                            <h1 className="font-bold text-2xl">210</h1>
                                            <i className="pi-arrow-up"></i><span>14% Last Month</span>
                                        </div>
                                    </div>
                                    <div className="mt-5 ml-5 w-60">
                                        <div className=" h-24 rounded-lg p-3 border">
                                            <span>......</span>
                                            <h1 className="font-bold text-2xl">620</h1>
                                            <i className="pi-arrow-up"></i><span>23% Last Month</span>
                                        </div>
                                    </div>
                                    <div className="mt-5 ml-5 w-60">
                                        <div className=" h-24 rounded-lg p-3 border">
                                            <span>......</span>
                                            <h1 className="font-bold text-2xl">5200</h1>
                                            <i className="pi-arrow-up"></i><span>23% Last Month</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="mt-5 w-full flex justify-between bg-white">
                            <div className="w-3/4 border rounded">
                            <h1 className="font-bold p-4">Aging - Account Receiveble</h1>
                                <Chart type="bar" data={chartData} options={chartOptions} />
                            </div>
                            <div className="w-1/5 border rounded">
                                <h1 className="font-bold p-4">Revenue</h1>
                                <Chart type="doughnut" data={doughnutChartData} options={doughnutChartOptions} className="w-full md:w-30rem" />
                            </div>
                        </div>
                        <div className="mt-5 w-full border rounded bg-white">
                            <div className="flex justify-between mb-3">
                                <h1 className="font-bold p-4">Recent Order</h1>
                                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                                    placeholder="Last Hours" className="w-40 md:w-14rem mr-5 mt-5 border" />                            
                            </div>
                            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                                <Column field="code" header="Order"></Column>
                                <Column field="name" header="Product"></Column>
                                <Column field="category" header="Order Date"></Column>
                                <Column field="status" header="Status"></Column>
                                <Column field="quantity" header="Qty"></Column>
                                <Column field="total" header="Total Price"></Column>
                                <Column field="sales" header="Sales"></Column>
                            </DataTable>
                        </div>
                    </Content>
                    <Footer
                    style={{
                        textAlign: 'center',
                    }}
                    >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default DashboardPage