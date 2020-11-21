import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { fadeInAnimation } from '../_animations';
import * as d3 from 'd3';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GateService } from '../_services/gate.service';


interface ResponseData {
    features: any[];
}

interface gateMap {
    lon: any;
    lat: any;
    name: any;
}

@Component({
    templateUrl: 'home.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation]
})
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
    receive: boolean;
    @ViewChild('chart')
    chartElement: ElementRef;

    constructor(
        private authenticationService: AuthenticationService,
        private gateService: GateService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        this.receive = true;
    }

    ngAfterViewInit() {
        console.log(this.chartElement.nativeElement.clientWidth)
        //Width and height
        var width = this.chartElement.nativeElement.clientWidth;
        var height = 500;

        //Create SVG element
        let svg = d3.select(this.chartElement.nativeElement)
            .append("svg")
            .attr("width", width - 15)
            .attr("height", height);

        //110,5
        //1100

        //-80, 25
        //250

        // Map and projection
        var projection = d3.geoMercator()
            .center([112, 2.5])                // GPS of location to zoom on
            .scale(7000)                       // This is like the zoom
            .translate([width / 2, height / 2])

        //Define path generator
        var path = d3.geoPath()
            .projection(projection);

        // Load external data and boot
        d3.json<ResponseData>("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then((data) => {

            console.log(data)
            // Filter data
            data.features = data.features.filter(d => { console.log(d.properties.name); return d.properties.name == 'Malaysia' || d.properties.name == 'Indonesia' });

            // Draw the map
            svg.selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("fill", function (d) {
                    console.log(d);
                    if (d.id == 'IDN') {
                        return "black";
                    }
                    else {
                        return "black";
                    }
                })
                .attr("d", path)
                .style("stroke", "none");

            d3.csv(environment.apiUrl + '/images/sarawakCity.csv').then((data) => {
                console.log('sarawakCity' + data);
                //Create one label per state
                svg.selectAll("text")
                    .data(data)
                    .enter()
                    .append("text")
                    .attr("class", "label")
                    .attr("fill", "white")
                    .attr("x", function (d) {
                        return projection([parseFloat(d.lon), parseFloat(d.lat)])[0];
                    })
                    .attr("y", function (d) {
                        return projection([parseFloat(d.lon), parseFloat(d.lat)])[1];
                    })
                    .text(function (d) {
                        return d.place;
                    });

            })

            this.gateService.getGates(1, '', 10)
                .subscribe(x => {
                    let dat: gateMap[] = x.gates;
                    console.log(x);
                    console.log(dat);
                    svg.selectAll("circle")
                        .data(dat)
                        .enter()
                        .append("circle")
                        .attr("cx", function (d) {
                            return projection([parseFloat(d.lon), parseFloat(d.lat)])[0];
                        })
                        .attr("cy", function (d) {
                            return projection([parseFloat(d.lon), parseFloat(d.lat)])[1];
                        })
                        .attr("r", function (d) {
                            return 10;
                        })
                        .style("fill", "yellow")
                        .style("stroke", "gray")
                        .style("stroke-width", 0.25)
                        .style("opacity", 0.75)
                        .append("title")			//Simple tooltip
                        .text(function (d) {
                            return d.name;
                        });
                }
                )

        })
    }
}