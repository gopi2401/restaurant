import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  salesChart: any = [];
  revenueChart: any = [];
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.salesChart = new Chart('sales-chart', {
      type: 'bar',
      data: {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: 'Sales ($)',
            data: [5000, 3000, 700, 4000, 2800, 1000, 900],
            backgroundColor: 'rgba(66, 165, 245, 0.6)',
            borderColor: 'rgba(30, 136, 229, 1)',
            borderWidth: 1
          },
        ],
      },
      options: {
        plugins: {
          // legend: {
          //   display: true,
          //   position: 'top'
          // },
          title: {
            display: true,
            text: 'Sales Overview',
            font: { weight: 'bold' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.revenueChart = new Chart('revenue-chart', {
      type: 'line',
      data: {
        labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
        datasets: [
          {
            label: 'Revenue ($)',
            data: [200, 400, 800, 1200, 1500, 2000, 1800],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.4, // Smooth curve
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time of Day'
            }
          },
          y: {
            beginAtZero: true,
          }
        }
      }
    });


  }

  changeDetect() {
    this.changeDetectorRef.detectChanges()
  }
}
