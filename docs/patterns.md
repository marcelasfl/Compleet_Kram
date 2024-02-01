**Princípio da Responsabilidade Única (SRP) e Exemplo em React.js**

O **Princípio da Responsabilidade Única (SRP)** é um dos princípios do **SOLID**, um conjunto de diretrizes de design de software que visam tornar o software mais fácil de entender, modificar e manter. O SRP afirma que uma classe deve ter apenas um motivo para mudar, ou seja, deve ter apenas uma responsabilidade no sistema.

**Benefícios do SRP:**

- **Manutenibilidade:** Classes menores e mais focadas são mais fáceis de entender e manter.
- **Flexibilidade:** Mudanças em uma parte do sistema não afetam outras partes não relacionadas.
- **Reutilização:** Classes bem definidas podem ser reutilizadas em diferentes contextos.

### Exemplo em React.js

Considere um exemplo onde temos um componente React que exibe uma lista de usuários. Vamos aplicar o SRP a este componente.

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

// Componente com múltiplas responsabilidades
const UserList = () => {
  const [users, setUsers] = useState([]);

  // Responsabilidade 1: Buscar dados da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://api.example.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Responsabilidade 2: Renderizar a lista de usuários
  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
```

Neste exemplo, o componente `UserList` tem duas responsabilidades:

1. **Buscar dados da API:** Isso implica em fazer uma requisição HTTP para obter os dados dos usuários.
2. **Renderizar a lista de usuários:** Isso envolve a exibição dos usuários na interface do usuário.

Para aplicar o SRP, podemos separar essas responsabilidades em dois componentes diferentes.

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

// Componente para buscar dados da API
const UserFetcher = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://api.example.com/users");
        onDataFetched(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, [onDataFetched]);

  return null;
};

// Componente para renderizar a lista de usuários
const UserList = ({ users }) => (
  <div>
    <h1>Lista de Usuários</h1>
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
);

// Componente pai que integra os dois componentes acima
const UserListContainer = () => {
  const [users, setUsers] = useState([]);

  const handleDataFetched = (data) => {
    setUsers(data);
  };

  return (
    <div>
      <UserFetcher onDataFetched={handleDataFetched} />
      <UserList users={users} />
    </div>
  );
};

export default UserListContainer;
```

Neste exemplo refatorado, o `UserFetcher` é responsável apenas por buscar dados da API, enquanto o `UserList` é responsável apenas por renderizar a lista de usuários. O componente `UserListContainer` atua como um componente pai que gerencia o estado e integra esses dois componentes especializados. Cada componente tem uma única responsabilidade, seguindo assim o Princípio da Responsabilidade Única.
