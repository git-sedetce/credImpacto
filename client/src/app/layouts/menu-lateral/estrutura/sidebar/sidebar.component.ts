import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  collapsed = false;
  menuOpen: any = {};
  perfil_id: number = 0;

  menu = [
    {
      label: 'Administração',
      icon: 'fa-shield-alt',
      roles: [1],
      children: [
        { label: 'Usuários', route: '/usuarios', icon: 'fa-user' },
        { label: 'Clientes', route: '/empresas', icon: 'fa-building' }
      ],
    },
    {
      label: 'Cadastros',
      icon: 'fa-folder',
      roles: [1,2,3],
      children: [
        { label: 'Animais', route: '/animais', icon: 'fa-paw' },
        { label: 'Tipo de Custo', route: '/tipocusto', icon: 'fa-paw' },
        { label: 'Vacina', route: '/vacina', icon: 'fa-paw' },
        { label: 'Fornecedores', route: '/fornecedores', icon: 'fa-paw' },
        { label: 'Ração', route: '/homeracao', icon: 'fa-paw' },
      ],
    },
    {
      label: 'Operacional',
      icon: 'fa-cogs',
      roles: [1, 2, 3],
      children: [
        { label: 'Lotes', route: '/cadastrolotes' },
        { label: 'Movimentação', route: '/movimentacao' },
        { label: 'Consumo de Ração', route: '/consumoracao' },
        { label: 'Aplicação de Vacinas', route: '/aplicacaovacina' },
        { label: 'Custos', route: '/custos' },
      ],
    },
    {
      label: 'Dashboard',
      icon: 'fa-chart-simple',
      roles: [1, 2, 3],
      children: [
        { label: 'Gráficos', route: '/dashboard' },
        { label: 'Tabela', route: '/controle' },
      ],
    },
  ];

  constructor(
    private router: Router,
  ) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  isParentActive(children: any[]): boolean {
    return children.some((child) => this.router.url.includes(child.route));
  }

  ngOnInit() {
    const saved = localStorage.getItem('sidebar_collapsed');
    this.collapsed = saved === 'true';

    // const user = this.serviceUser.getUser();
    // this.perfil_id = user._profile_id|| 0;

    this.abrirMenuAtivo();
  }

  abrirMenuAtivo() {
    this.menu.forEach((item) => {
      if (this.isParentActive(item.children)) {
        this.menuOpen[item.label] = true;
      }
    });
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    localStorage.setItem('sidebar_collapsed', String(this.collapsed));
  }

  toggleMenu(label: string) {
    this.menuOpen[label] = !this.menuOpen[label];
  }

  hasAccess(item: any) {
    return item.roles.includes(this.perfil_id);
  }

}
