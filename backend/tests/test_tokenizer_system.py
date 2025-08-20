import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
import importlib

def test_import_tokenizer_system():
    assert importlib.util.find_spec('tokenizer_system') is not None
