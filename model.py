import torch
import torch.nn as nn

class AudioLSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, output_size):
        super(AudioLSTM, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        h0 = torch.zeros(self.num_layers, 1, self.hidden_size).to(x.device)
        c0 = torch.zeros(self.num_layers, 1, self.hidden_size).to(x.device)

        out, _ = self.lstm(x, (h0, c0))

        out = self.fc(out[:, -1, :])
        return out

if __name__ == "__main__":
    input_size = 10    
    hidden_size = 128   
    num_layers = 2    
    output_size = 22   
    batch_size = 32  
    sequence_length = 20 

    model = AudioLSTM(input_size, hidden_size, num_layers, output_size)

    input_data = torch.randn(1, sequence_length, input_size)  

    output = model(input_data)
    print(output.shape) 
