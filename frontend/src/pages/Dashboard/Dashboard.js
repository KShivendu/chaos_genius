
import React from "react";
import {
    Grid, Card, CardContent, CardActions,
    Button, Typography, InputLabel, MenuItem,
    FormControl, Select, CircularProgress, Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core';

import CustomTabs from '../../components/CustomTabs'

import { tab1Fields } from './HelperFunctions'
import SideBar from './SideBar'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import RcaAnalysisTable from '../../components/DashboardTable';
import { BASE_URL, DEFAULT_HEADERS } from '../../config/Constants'


// Am4charts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_sunburst from "@amcharts/amcharts4/plugins/sunburst";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ThreeSixty } from "@material-ui/icons";
am4core.useTheme(am4themes_animated);
class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            kpi: 0,
            kpiName: "KPI",
            cardData: [],
            cardDataLoader: false,
            timeline: "mom",
            lineChartData: {},
            dimensionData: [],
            kpiData: [],
            chartData: [],
            dataColumns: [{ title: "Subgroup Name", field: "subgroup" }, { title: "Previous Avg", field: 'g1_agg' }, { title: "Previous Subgroup Size", field: 'g1_size' }, { title: "Previous Subgroup Count", field: 'g1_count' }, { title: "Current Avg", field: 'g2_agg' }, { title: "Current Subgroup Size", field: 'g2_size' }, { title: "Current Subgroup Count", field: 'g2_count' }, { title: "Impact", field: 'impact' }],
            yAxis: [],
            tableData: [],
            amChart: null,
            cardDataLoader: false,
            loading: false,
            tabState: 0

        }

    }

    fetchKpiAggegation = () => {
        const { kpi, timeline } = this.state;
        if (kpi !== 0) {
            this.setState({
                cardDataLoader: true
            })
            fetch(`${BASE_URL}/api/kpi/${kpi}/kpi-aggregations?timeline=${timeline}`)
                .then(response => response.json())
                .then(respData => {
                    const data = respData.data;
                    if (data?.panel_metrics) {
                        this.setState({
                            cardData: data.panel_metrics,                            
                        })
                    }
                    this.setState({
                        cardDataLoader: false
                    })
                });
        }
    }
    handleKpiChange = (e) => {
        const targetComponent = e.target;
        const componentValue = targetComponent.id;

        this.setState({
            kpi: componentValue,
            kpiName: targetComponent.innerText,
            tabState: 0
        }, () => {
            this.fetchKpiAggegation();
            this.plotLineChart();
            this.fetchDimensionData();
        })
    }
    handleTimelineChange = (e) => {
        const targetComponent = e.target;
        this.setState({
            timeline: targetComponent.value,
        }, () => {
            this.setDataColumns();
            this.fetchKpiAggegation();
            this.fetchAnalysisData();
        })
    }
    fetchDimensionData = () => {
        this.setState({ loading: true })
        fetch(`${BASE_URL}/api/kpi/${this.state.kpi}/get-dimensions`)
            .then(response => response.json())
            .then(data => {
                const dimensionArray = data.dimensions;
                dimensionArray.unshift("multidimension")
                this.setState({
                    dimension: 'multidimension',
                    dimensionData: dimensionArray,
                    loading: false
                }, () => {
                    this.fetchAnalysisData();
                })
            });
    }
    handleDimensionChange = (e, type, newValue) => {
        const targetComponent = e.target;
        let targetValue = this.state.dimension;
        if (type === "options") {
            targetValue = targetComponent.value
        } else {
            targetValue = targetComponent.id
            if (newValue || newValue === 0) {
                this.setState({
                    tabState: newValue
                })
            }
        }

        this.setState({
            dimension: targetValue,
            tableData: []
        }, () => {
            this.fetchAnalysisData();
        })
    }
    fetchAnalysisData = () => {
        const { kpi, timeline, dimension, tabState } = this.state;
        let dimensionStr = ""
        if (tabState !== 0) {
            dimensionStr = `&dimension=${dimension}`
        }
        if (kpi !== 0) {
            this.setState({ loading: true })
            fetch(`${BASE_URL}/api/kpi/${kpi}/rca-hierarchical-data?timeline=${timeline}${dimensionStr}`)
                .then(response => response.json())
                .then(respData => {
                    const data = respData.data;
                    if (data?.data_table) {
                        this.setState({
                            tableData: data.data_table,
                            loading: false
                        })
                    }
                });


            this.setState({ loading: true })
            fetch(`${BASE_URL}/api/kpi/${kpi}/rca-analysis?timeline=${timeline}${dimensionStr}`)
                .then(response => response.json())
                .then(respData => {
                    const data = respData.data;
                    if (data?.chart) {
                        this.setState({
                            chartData: data.chart.chart_data,
                            yAxis: data.chart.y_axis_lim,
                            // tableData: data.data_table,
                            loading: false
                        }, () => {
                            this.plotChart();
                        })
                    }
                });

        }
    }

    plotChart = () => {
        am4core.options.autoDispose = true;

        // if (this.state.amChart) {
        //   this.state.amChart.data = this.state.chartData;
        //   let valueAxis = this.state.amChart.yAxes.getIndex(0);
        //   valueAxis.min = this.state.yAxis[0];
        //   valueAxis.max = this.state.yAxis[1];
        // } else {
        let chart = am4core.create("chartdivWaterfall", am4charts.XYChart);

        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        // using math in the data instead of final values just to illustrate the idea of Waterfall chart
        // a separate data field for step series is added because we don't need last step (notice, the last data item doesn't have stepValue)
        chart.data = this.state.chartData;

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.minGridDistance = 40;

        // Configure axis label
        var xlabel = categoryAxis.renderer.labels.template;
        xlabel.wrap = true;
        xlabel.maxWidth = 120;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        if (this.state.yAxis.length > 0) {
            valueAxis.min = this.state.yAxis[0];
            valueAxis.max = this.state.yAxis[1];
        }

        let columnSeries = chart.series.push(new am4charts.ColumnSeries());
        columnSeries.dataFields.categoryX = "category";
        columnSeries.dataFields.valueY = "value";
        columnSeries.dataFields.openValueY = "open";
        columnSeries.fillOpacity = 0.8;
        columnSeries.sequencedInterpolation = true;
        columnSeries.interpolationDuration = 1500;

        let columnTemplate = columnSeries.columns.template;
        columnTemplate.strokeOpacity = 0;
        columnTemplate.propertyFields.fill = "color";

        let label = columnTemplate.createChild(am4core.Label);
        label.text = "{displayValue.formatNumber('#,## a')}";
        label.align = "center";
        label.valign = "middle";
        label.wrap = true;
        label.maxWidth = 120;

        let stepSeries = chart.series.push(new am4charts.StepLineSeries());
        stepSeries.dataFields.categoryX = "category";
        stepSeries.dataFields.valueY = "stepValue";
        stepSeries.noRisers = true;
        stepSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        stepSeries.strokeDasharray = "3,3";
        stepSeries.interpolationDuration = 2000;
        stepSeries.sequencedInterpolation = true;

        // because column width is 80%, we modify start/end locations so that step would start with column and end with next column
        stepSeries.startLocation = 0.1;
        stepSeries.endLocation = 1.1;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "none";
        this.setState({
            amChart: chart,
        })

        // }
    }
    fetchKPIData = () => {
        this.setState({ loading: true })
        fetch(`${BASE_URL}/api/kpi/`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    kpiData: data.data,
                    loading: false
                })
            });
    }
    setDataColumns = () => {
        let timeMetric = '';
        if (this.state.timeline === 'mom') {
            timeMetric = 'month';
        } else if (this.state.timeline === 'wow') {
            timeMetric = 'week';
        }
        this.setState({
            dataColumns: [
                { title: `Subgroup Name`, field: "subgroup" },
                { title: `Prev ${timeMetric} Avg`, field: 'g1_agg' },
                { title: `Prev ${timeMetric} Size`, field: 'g1_size' },
                { title: `Prev ${timeMetric} Count`, field: 'g1_count' },
                { title: `Curr ${timeMetric} Avg`, field: 'g2_agg' },
                { title: `Curr ${timeMetric} Size`, field: 'g2_size' },
                { title: `Curr ${timeMetric} Count`, field: 'g2_count' },
                { title: `Impact`, field: 'impact' }
            ]
        });
    }
    componentDidMount() {
        this.plotLineChart();
        this.fetchKPIData();
        this.fetchKpiAggegation();
        this.fetchDimensionData();
        this.setDataColumns();
    }
    tabHousingChart = () => {
        return (

            <Card className="mb-4 chart-tab-card">
                <CardContent>
                    <div id="chartdivWaterfall" style={{ width: "100%", height: "500px" }}></div>
                </CardContent>
            </Card>

        )
    }
    renderAutoRCA = () => {
        const tabChartData = [];
        if (this.state.dimensionData) {
            this.state.dimensionData.map((key) => {
                const datatab = {};
                datatab['title'] = key;
                datatab['body'] = this.tabHousingChart();
                tabChartData.push(datatab)
            });
        }
        return (
            <>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" style={{ width: '100%' }}>
                                    {/* <InputLabel htmlFor="analysisTimeline">Timeline</InputLabel> */}
                                    <Select native defaultValue={this.state.timeline} id="analysisTimeline" onChange={(e) => this.handleTimelineChange(e)}>
                                        <option value="mom">Current Month on Last Month</option>
                                        <option value="wow">Current Week on Last Week</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} >
                            <Grid item xs={12} md={5}>
                                {(this.state.cardData) ? (tab1Fields(this.state.cardData, this.state.kpiName, this.state.cardDataLoader)) : ("")}
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Card>
                                    <CardContent>
                                        <div id="lineChartDiv" style={{ width: "100%", height: "300px" }}></div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>


                    </CardContent>
                </Card>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Drill Downs</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {(this.state.loading) ? (
                            <div className="loader">
                                <CircularProgress color="secondary" />
                            </div>
                        ) : (
                            <CustomTabs tabs={tabChartData} handleDimensionChange={this.handleDimensionChange} tabState={this.state.tabState}  />
                        )}
                    </AccordionDetails>
                </Accordion>

            </>
        )
    }
    plotLineChart = () => {
        am4core.options.autoDispose = true;

        // if (this.state.amChart) {
        //   this.state.amChart.data = this.state.chartData;
        //   let valueAxis = this.state.amChart.yAxes.getIndex(0);
        //   valueAxis.min = this.state.yAxis[0];
        //   valueAxis.max = this.state.yAxis[1];
        // } else {
        let chart = am4core.create("lineChartDiv", am4charts.XYChart);

        // Add data
        // chart.data = [
        //     { date: new Date(2019, 5, 12), value1: 50, value2: 48, previousDate: new Date(2019, 5, 5) },
        //     { date: new Date(2019, 5, 13), value1: 53, value2: 51, previousDate: new Date(2019, 5, 6) },
        //     { date: new Date(2019, 5, 14), value1: 56, value2: 58, previousDate: new Date(2019, 5, 7) },
        //     { date: new Date(2019, 5, 15), value1: 52, value2: 53, previousDate: new Date(2019, 5, 8) },
        //     { date: new Date(2019, 5, 16), value1: 48, value2: 44, previousDate: new Date(2019, 5, 9) },
        //     { date: new Date(2019, 5, 17), value1: 47, value2: 42, previousDate: new Date(2019, 5, 10) },
        //     { date: new Date(2019, 5, 18), value1: 59, value2: 55, previousDate: new Date(2019, 5, 11) }
        // ]
        chart.data = [{ "previousDate": "2011/05/01 00:00:00", "value2": 6973.66, "date": "2011/06/01 00:00:00", "value1": 15390.89 }, { "previousDate": "2011/05/02 00:00:00", "value2": 0.0, "date": "2011/06/02 00:00:00", "value1": 28104.56 }, { "previousDate": "2011/05/03 00:00:00", "value2": 28910.41, "date": "2011/06/03 00:00:00", "value1": 15042.26 }, { "previousDate": "2011/05/04 00:00:00", "value2": 27532.0, "date": "2011/06/04 00:00:00", "value1": 0.0 }, { "previousDate": "2011/05/05 00:00:00", "value2": 25232.67, "date": "2011/06/05 00:00:00", "value1": 25639.54 }, { "previousDate": "2011/05/06 00:00:00", "value2": 30786.7, "date": "2011/06/06 00:00:00", "value1": 16290.98 }, { "previousDate": "2011/05/07 00:00:00", "value2": 0.0, "date": "2011/06/07 00:00:00", "value1": 33908.26 }, { "previousDate": "2011/05/08 00:00:00", "value2": 18867.4, "date": "2011/06/08 00:00:00", "value1": 30192.13 }, { "previousDate": "2011/05/09 00:00:00", "value2": 21624.41, "date": "2011/06/09 00:00:00", "value1": 42910.38 }, { "previousDate": "2011/05/10 00:00:00", "value2": 29870.7, "date": "2011/06/10 00:00:00", "value1": 58245.12 }]
        // chart.data = this.state.chartData['baseline']

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value1";
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.minBulletDistance = 10;
        series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
        series.tooltip.pointerOrientation = "vertical";

        // Create series
        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "value2";
        series2.dataFields.dateX = "date";
        series2.strokeWidth = 2;
        series2.strokeDasharray = "3,4";
        series2.stroke = series.stroke;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;

    }
    render() {
        const tabChartData = [{
            "title": "AutoRCA",
            "body": this.renderAutoRCA()
        }];

        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <SideBar handleKpiChange={this.handleKpiChange} />
                </Grid>
                <Grid item xs={9}>
                    <CustomTabs tabs={tabChartData} />
                    <div style={{ display: this.state.tableData.length ? 'block' : 'none' }}>
                        <Card className="mb-4 ">
                            <CardContent>
                                <h5 className="mb-4">Top Subgroups Data</h5>
                                <p>These are the top 50 subgroups sorted by their Impact.</p>
                                {(Object.keys(this.state.tableData).length > 0) ? (
                                    <RcaAnalysisTable data={this.state.tableData.slice(0, 50)} columns={this.state.dataColumns} />) : ("")}
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        )
    }


}
export default Dashboard;
