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

        //Number formatting for population values
        var formatAsThousands = d3.format(",");  //e.g. converts 123456 to "123,456"

        let arrDat = [
            {
                lat: "1.5500",
                lon: "110.3333",
                name: "Iris Gate"
            }
        ]




        // Load external data and boot
        d3.json<ResponseData>("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then((data) => {

            console.log(data)
            // Filter data
            data.features = data.features.filter(d => { console.log(d.properties.name); return d.properties.name == 'Malaysia' });

            // Draw the map
            svg.selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("fill", "white")
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                .style("stroke", "none");

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
                            return 4;
                        })
                        .style("fill", "lightblue")
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