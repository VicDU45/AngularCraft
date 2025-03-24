import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  template: `
    <div class="geral">
      <h1>Conversor de Moedas</h1>
      
      <div class="imagem-container">
        <img [src]="imagemMoeda" alt="Moeda selecionada" >
      </div>


      <div class="context">
        <label>Valor em Real (R$): </label>
        <input type="number" [(ngModel)]="valorReal" min="0.01" step="0.01">
      </div>
      
      <div class="context">
        <label>Converter para: </label>
        <select [(ngModel)]="moedaSelecionada" (change)="atualizarImagem()">
          <option value="R$">--</option>  
          <option value="USD">Dólar</option>
          <option value="EUR">Euro</option>
          <option value="GBP">Libra</option>
        </select>
      </div>

      <button (click)="converter()">
        Converter
      </button>
      
      <div *ngIf="resultado" class="resultado">
        <p>
          {{valorReal}} Reais = {{resultado}} {{moedaSelecionada}}
        </p>
      </div>
      
      <router-outlet />
    </div>
  `,
  styles: [
    `.geral {
        text-align:center;
        max-width:500px; 
        margin:0 auto; 
        padding:150px; 
        font-family: Georgia;
        color: #FFD700;
        background: #006400; 
      }
      .context{
        margin:15px;
      } 
      .imagem-container {
        margin-top: 0px;
        margin-right: 600px;
        padding:0px;
        position: fixed;
      }
      img {
        width: 100px;
        height: 120px;
      }
      button{
        background: #DAA520; 
        color: #111111; 
        padding:8px 15px; 
        border:none; 
        border-radius:4px;
      }
      .resultado{
        margin-top:20px; 
        padding:15px;
        color: #111111; 
        background: #B8860B; 
        border-radius:4px;
        font-size:18px; 
        font-weight:bold;
      }
      `
  ],
})
export class AppComponent {
  title = 'conversor-simples';
  valorReal: number = 1;
  moedaSelecionada: string = 'R$';
  resultado?: number;
  imagemMoeda: string = 'base.png';
  
  taxas = {'R$':1, 'USD': 0.20, 'EUR': 0.17, 'GBP': 0.15 };
  
  converter() {
    if (this.valorReal > 0) {
      this.resultado = parseFloat((this.valorReal * this.taxas[this.moedaSelecionada as keyof typeof this.taxas]).toFixed(2));
    }
  }

  atualizarImagem() {
    const imagens: { [key: string]: string } = {
      'R$':'base.png',
      'USD': 'dolar.png',
      'EUR': 'euro.png',
      'GBP': 'libra.png'
    };
    this.imagemMoeda = imagens[this.moedaSelecionada] ||'dolar.png' ;
  }
}