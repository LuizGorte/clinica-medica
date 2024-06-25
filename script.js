let consultas = [];
let pacientes = []; // Array para armazenar os pacientes

const consultaForm = document.getElementById('consultaForm');
const consultasContainer = document.getElementById('consultas');
const listaPacientes = document.getElementById('listaPacientes');

function adicionarConsulta() {
    
    const paciente = document.getElementById('paciente').value;
    const medico = document.getElementById('medico').value;
    const data = document.getElementById('data').value;
    
    const novaConsulta = {
        paciente: paciente,
        medico: medico,
        data: data
    };
    
    consultas.push(novaConsulta);
    
    if (!pacientes.includes(paciente)) {
        pacientes.push(paciente);
        listarPacientes(); // Atualiza a lista de pacientes na interface
    }
    console.log(pacientes)
    listarConsultas();
    
    consultaForm.reset();
}

function listarConsultas() {
    consultasContainer.innerHTML = '';
    
    consultas.forEach((consulta, index) => {
        const consultaElement = document.createElement('div');
        consultaElement.classList.add('consulta');
        
        consultaElement.innerHTML = `
            <p><strong>Paciente:</strong> ${consulta.paciente}</p>
            <p><strong>Médico:</strong> ${consulta.medico}</p>
            <p><strong>Data e Hora:</strong> ${consulta.data}</p>
            <button onclick="editarConsulta(${index})">Editar</button>
            <button onclick="cancelarConsulta(${index})">Cancelar</button>
        `;
        
        consultasContainer.appendChild(consultaElement);
    });
}

function listarPacientes() {
    listaPacientes.innerHTML = ''; // Limpa a lista de pacientes
    
    pacientes.forEach((paciente, index) => {
        const pacienteItem = document.createElement('li');
        pacienteItem.textContent = paciente;
        
        listaPacientes.appendChild(pacienteItem);
    });
}

function editarConsulta(index) {
    const consultaAtual = consultas[index];
    
    const novoPaciente = prompt(`Informe o novo nome do paciente (atual: ${consultaAtual.paciente}):`);
    if (novoPaciente !== null && novoPaciente !== '') {
        consultaAtual.paciente = novoPaciente;
        
        if (!pacientes.includes(novoPaciente)) {
            pacientes.push(novoPaciente);
            listarPacientes();
        }
    }
    
    const novoMedico = prompt(`Informe o novo nome do médico (atual: ${consultaAtual.medico}):`);
    if (novoMedico !== null && novoMedico !== '') {
        consultaAtual.medico = novoMedico;
    }
    
    const novaData = prompt(`Informe a nova data e hora da consulta (atual: ${consultaAtual.data}):`);
    if (novaData !== null && novaData !== '') {
        consultaAtual.data = novaData;
    }
    
    listarConsultas();
}

function cancelarConsulta(index) {
    const confirmacao = confirm(`Tem certeza que deseja cancelar a consulta de ${consultas[index].paciente} marcada para ${consultas[index].data}?`);
    
    if (confirmacao) {
        const pacienteCancelado = consultas[index].paciente;
        consultas.splice(index, 1);
        listarConsultas();
        
        // Remover o paciente da lista, se não houver mais consultas agendadas com ele
        const consultasDoPaciente = consultas.filter(consulta => consulta.paciente === pacienteCancelado);
        if (consultasDoPaciente.length === 0) {
            const indexPaciente = pacientes.indexOf(pacienteCancelado);
            if (indexPaciente !== -1) {
                pacientes.splice(indexPaciente, 1);
                listarPacientes();
            }
        }
    }
}

consultaForm.addEventListener('submit', adicionarConsulta);

listarConsultas();
listarPacientes();